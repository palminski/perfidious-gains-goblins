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
        addComment: async(parent, {postId, commentText}, context) => {
            const updatedPost = await Post.findOneAndUpdate(
                {_id: postId},
                {$push: {comments: {commentText, createdBy: context.user.username}}},
                {new:true, runValidators: true}
            );
            return updatedPost;
        },
        deleteUser: async(parent, {_id}) => {
            const user = await User.deleteOne({_id: _id});
            return user;
        },
        //This will be updated with login context in the future.
        addExcersize: async(parent, {excersize, amount, units, reps, sets}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$push: {excersizes: {excersize: excersize, amount:amount, units:units, reps:reps, sets:sets}}},
                    {new:true, runValidators:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to add an excersize');
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