const User = require('../models/users.model');
const Post = require('../models/posts.model');
const mongoose = require('mongoose')
const { NotFoundError } = require('../error')

//finding latest comments using aggregate pipeline with pagination, sorting and projection
const findLatestComments = async (params, query) => {
    const comments = await Post.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(params.id) }
        },
        {
            $unwind: '$comments'
        },
        {
            $lookup: {
                from: 'users',
                localField: 'comments.commentBy',
                foreignField: '_id',
                as: 'comments.abc'
            }
        },
        {
            $sort: { 'comments.commentDate': -1 }
        },
        {
            $skip: isNaN(+query.skip) ? 0 : +query.skip
        },
        {
            $limit: isNaN(+query.limit) ? 5 : +query.limit
        },
        {
            $addFields : {
                'comments.user': {$first : "$comments.abc"},
            }
        },
        {
            $project: {
                _id: 0,
                'comments.comment': 1,
                'comments.commentBy': '$comments.user.username',
                'comments.commentDate': 1
            }
        }
    ]);

    if (comments.length === 0) {
        throw new NotFoundError('There is no comments on post!');
    }

    return comments;
}


const searchByUsername = async (query) => {
    const users = await User.find(
        {
            username: { $regex: query.search, $options: 'i' }
        },
        {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        }
    );

    if (users.length === 0) {
        throw new NotFoundError('No users found!');
    }

    return users;
}


//finding counts of post with specific tag 
const countOfPosts = async () => {
    const posts = await Post.aggregate([
        {
            $unwind: '$tags'
        },
        {
            $group: { _id: "$tags", count: { $sum: 1 } }
        }
    ]);
    if (posts.length === 0) {
        throw new NotFoundError('No posts found!');
    }
    return posts;
}


module.exports = {
    findLatestComments,
    searchByUsername,
    countOfPosts
}