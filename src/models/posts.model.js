const mongoose = require('mongoose');
const validator = require('validator');

const postSchema = mongoose.Schema({
    caption : {
        type : String,
        trim : true,
    },
    location : {
        type : String,
        trim : true,
        lowercase : true
    },
    likes : {
        type : Number,
        trim : true,
        default : 0,
        validate : (value) => {
            if(value < 0) {
                throw new Error('likes must be greater than 0');
            }
        }
    },
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : 'User'
    }
}, {timestams : true})

module.exports = mongoose.model('Post', postSchema)