const {Schema} = require('mongoose');
 const noteSchema = new Schema(
    {
        noteText: {
            type: String,
            required: true,
            trim: true
        },
    }
 )


 module.exports = noteSchema;