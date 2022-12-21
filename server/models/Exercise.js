const {Schema} = require('mongoose');
 const exerciseSchema = new Schema(
    {
        exercise: {
            type: String,
            required: true,
            trim: true
        },
        amount:{
            type: Number,
            required: true
        },
        units:{
            type: String,
            required: true,
            trim:true
        },
        reps:{
            type: Number,
            required: true
        },
        sets:{
            type: Number,
            required: true
        },
    }
 )


 module.exports = exerciseSchema;