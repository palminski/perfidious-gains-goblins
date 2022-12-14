const { AuthenticationError } = require('apollo-server-express');
const {User, Post} = require('../models');
const { signToken } = require('../utils/auths');

const resolvers = {
    Query: {
        users: async() => {
            return User.find()
        },
        posts: async() => {
            return Post.find()
        },
        me: async (parent, args, context) => {
            console.log('Get Me');
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                return userData
            }
            throw new AuthenticationError('Not Logged In!');
        }
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        loginUser: async(parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('Incorrect login credentials. Please try again');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect login credentials. Please try again.');
            }

            const token = signToken(user);


            return { token, user }
        },
        addPost: async(parent, {postTitle, postText}, context) => {
            if (context.user) {
                const post = await Post.create({postTitle, postText, createdBy:context.user.username}); 
                let numberOfPosts = await Post.collection.countDocuments();
                if (numberOfPosts > 5) {
                    console.log(`there are now ${numberOfPosts} posts`);
                    //This is where we can delete old posts when new ones show up
                }
                return post;
            } 
            throw new AuthenticationError('You need to be logged in to make a post!')
            
        
        },

        deletePost: async(parent, {postId}, context) => {
            if (context.user) {
                const deletePost = await Post.deleteOne({_id: postId});
                return deletePost;
            }
            throw new AuthenticationError('You need to be logged in to delete a post!')
            
        },

        

        addComment: async(parent, {postId, commentText}, context) => {
            const updatedPost = await Post.findOneAndUpdate(
                {_id: postId},
                {$push: {comments: {commentText, createdBy: context.user.username}}},
                {new:true, runValidators: true}
            );
            return updatedPost;
        },

        deleteComment: async(parent, {postId, commentId}, context) => {
            if (context.user) {
                const deleteComment = await Post.findOneAndUpdate({_id: postId}, {$pull: {comments: {_id:commentId}}}, {new: true});
                return deleteComment;
            }
            throw new AuthenticationError('You need to be logged in to delete a comment!')
        },

        deleteUser: async(parent, {_id}) => {
            const user = await User.deleteOne({_id: _id});
            return user;
        },
        //====[Resolvers for Journal Page==================================================================]
        addExercise: async(parent, {exercise, amount, units, sets, reps }, context) => {
            console.log('add Exercise');
            if (context.user) {
                console.log(context.user);
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$push: {exercises: {exercise: exercise, amount:amount, units:units, reps:reps, sets:sets}}},
                    {new:true, runValidators:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to add an exercise');
        },
        editExercise: async(parent, {exerciseId, exercise, amount, units, sets, reps }, context) => {
            console.log('edit Exercise');
            if (context.user) {
                const user = await User.findById(context.user._id);
                const index =user.exercises.findIndex(exercize => exercize._id.toString() === exerciseId);
                console.log(index, 91);

                const replacer = { _id: exerciseId, exercise, amount, units, reps, sets };

                user.exercises.splice(index, 1, replacer);
                await user.save();
                return user;

                
                // let updatedUser = await User.findOneAndUpdate(
                //     {_id: context.user._id},
                //     {
                //         $pull: {
                //             exercises: {
                //                 _id: exerciseId
                //             }
                //         },
                //         $push: {exercises: {exercise, amount, units, reps, sets}}
                //     },
                //     {new:true}
                // );
                // updatedUser = await User.findOneAndUpdate(
                //     {_id: context.user._id},
                //     {$push: {exercises: {exercise: exercise, amount:amount, units:units, reps:reps, sets:sets}}},
                //     {new:true, runValidators:true}
                // );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to edit an exercise');
        },
        deleteExercise: async(parent,{exerciseId}, context) => {
            console.log('remove Exercise');
            if (context.user) {
                
                console.log(exerciseId)
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {exercises: {_id: exerciseId}}},
                    {new:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to delete an exercise');
        },
        addNote: async(parent, {noteText}, context) => {
            console.log('add Note');
            if (context.user) {
                console.log(context.user);
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$push: {notes: {noteText}}},
                    {new:true, runValidators:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to add a note');
        },
        editNote: async(parent, {noteId, noteText}, context) => {
            console.log('edit Note');
            if (context.user) {
                
                console.log(noteId)
                let updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {notes: {_id: noteId}}},
                    {new:true}
                );
                updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$push: {notes: {noteText: noteText}}},
                    {new:true, runValidators:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to edit a Note');
        },
        deleteNote: async(parent,{noteId}, context) => {
            console.log('remove Note');
            if (context.user) {
                
                console.log(noteId)
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {notes: {_id: noteId}}},
                    {new:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to delete a note');
        },
    },
    //Field Resolvers
    User: {
        posts: async (root) => {
            try {
                return await Post.find({createdBy:root.username});
            }
            catch (error) {
                throw new Error(error);
            }
        }
    }
};

module.exports = resolvers