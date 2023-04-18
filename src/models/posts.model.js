const mongoose = require('mongoose');
const validator = require('validator');

const postSchema = mongoose.Schema({
    caption: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
        lowercase: true
    },
    tags: {
        type : [String],
        lowercase: true
    },
    comments: [{
        comment: {
            type: String,
            commentBy: {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: 'User'
            }
        }
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
}, { timestams: true })


const Post = mongoose.model('Post', postSchema);

module.exports = Post