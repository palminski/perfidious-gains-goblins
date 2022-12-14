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
        addComment: async(parent, {postId, commentText, createdBy}) => {
            const updatedPost = await Post.findOneAndUpdate(
                {_id: postId},
                {$push: {comments: {commentText, createdBy}}},
                {new:true, runValidators: true}
            );
            return updatedPost;
        },
        deleteUser: async(parent, {_id}) => {
            const user = await User.deleteOne({_id: _id});
            return user;
        },
        //====[Resolvers for Journal Page==================================================================]
        addExcersize: async(parent, {excersize, amount, units, sets, reps }, context) => {
            console.log('add Excersize');
            if (context.user) {
                console.log(context.user);
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$push: {excersizes: {excersize: excersize, amount:amount, units:units, reps:reps, sets:sets}}},
                    {new:true, runValidators:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to add an excersize');
        },
        editExcersize: async(parent, {excersizeId, excersize, amount, units, sets, reps }, context) => {
            console.log('edit Excersize');
            if (context.user) {
                
                console.log(excersizeId)
                let updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {excersizes: {_id: excersizeId}}},
                    {new:true}
                );
                updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$push: {excersizes: {excersize: excersize, amount:amount, units:units, reps:reps, sets:sets}}},
                    {new:true, runValidators:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to edit an excersize');
        },
        deleteExcersize: async(parent,{excersizeId}, context) => {
            console.log('remove Excersize');
            if (context.user) {
                
                console.log(excersizeId)
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {excersizes: {_id: excersizeId}}},
                    {new:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to delete an excersize');
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