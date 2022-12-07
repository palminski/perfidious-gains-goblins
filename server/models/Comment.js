const {Schema} = require('mongoose');

const commentSchema = new Schema(
    {
        commentText: {
            type: String,
            required: 'You must include text in a post',
            minlength: 1,
            maxlength: 500
        },
        createdBy: {
            type: String,
            required: true
        },
        
    }
);



module.exports = commentSchema;