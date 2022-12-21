const {Schema, model} = require('mongoose');
const commentSchema = require('./Comment');

const postSchema = new Schema(
    {
        postTitle: {
            type: String,
            required: 'You must include text in a post',
            minlength: 1,
            maxlength: 500
        },
        postText: {
            type: String,
            required: 'You must include text in a post',
            minlength: 1,
            maxlength: 500
        },
        createdBy: {
            type: String,
            required: true,
            references: {
                key: "username",
                model: "User"
            } 
        },
        comments: [commentSchema]
    }
);

const Post = model('Post', postSchema);

module.exports = Post;