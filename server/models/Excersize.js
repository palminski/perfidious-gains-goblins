const {Schema} = require('mongoose');
 const excersizeSchema = new Schema(
    {
        excersize: {
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


 module.exports = excersizeSchema;