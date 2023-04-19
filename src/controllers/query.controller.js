const User = require('../models/users.model');
const Post = require('../models/posts.model');
const mongoose = require('mongoose')

//finding last 4 days comments on specific post with count
const findCommentsOfLast4Days = async (req, res, next) => {
    try{
        const comments = await Post.aggregate([
            {$match : {_id : new mongoose.mongo.ObjectId(req.params.id) }}
        ])
        if(comments.length === 0){
            return res.status(404).json({error : 'no comments from past 4 days'});
        }
        res.status(200).json({data : comments})
    }
    catch(err){
        next(err)
    }

}


module.exports = {
    findCommentsOfLast4Days
}