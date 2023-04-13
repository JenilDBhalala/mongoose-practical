const User = require('../models/users.model');
const Post = require('../models/posts.model');

//finding top 5 posts that have most likes
module.exports = {
    findFiveMostLikedPosts : async (req, res, next) => {
        const posts = await Post.find().sort({likes : -1}).limit(5);

        if(posts.length === 0)
            return res.status(404).json({error : 'post not found!'})

        res.status(200).json({data : posts});
    } 
}