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
        },
        commentBy: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User'
        },
        commentDate: {
            type: Date,
            default: Date.now()
        }
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
}, { timestamps: true })


const Post = mongoose.model('Post', postSchema);

module.exports = Post