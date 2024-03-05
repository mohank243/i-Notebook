const mongoose = require('mongoose')
const { Schema } = mongoose;

const noteSchema = new Schema({
    //Adding the foreign of user for fetching notes
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title: {
        type:String,
        required: true
    }, // String is shorthand for {type: String}
    description: {
        type:String,
    }, 
    tag: {
        type:String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
    });

module.exports = mongoose.model('note', noteSchema);