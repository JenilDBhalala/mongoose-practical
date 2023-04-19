const User = require('../models/users.model');
const Post = require('../models/posts.model');
const mongoose = require('mongoose')

//finding latest comments on specific post : pagination with aggregation
const findLatestComments = async (req, res, next) => {
    try {
        //pagination using find method with populate 
        // const comments = await Post.find({_id : req.params.id}, {_id : 0, caption: 0, location: 0, postedBy : 0, tags:0, comments : {$slice : [+req.query.skip, +req.query.limit]}})
        // .populate('comments.commentBy', {_id : 0, username : 1})

        //finding latest comments using aggregate pipeline with pagination, sorting and projection
        const comments = await Post.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $unwind: '$comments'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'comments.commentBy',
                    foreignField: '_id',
                    as: 'comments.commentBy'
                }
            },
            {
                $sort: { 'comments.commentDate': -1 }
            },
            {
                $skip: +req.query.skip
            },
            {
                $limit: +req.query.limit
            },
            {
                $project: {
                    _id: 0,
                    'comments.comment': 1,
                    'comments.commentBy.username': 1,
                    'comments.commentDate': 1
                }
            }
        ]);

        if (comments.length === 0) {
            return res.status(404).json({ error: 'There is no comments on post!' });
        }

        res.status(200).json({ data: comments })
    }
    catch (err) {
        next(err)
    }

}


module.exports = {
    findLatestComments
}