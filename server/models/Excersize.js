const {Schema, model} = require('mongoose');
 const excersizeSchema = new Schema(
    {
        excersize: {
            type: String,
            required: true,
            trim: true
        },
        ammount:{
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