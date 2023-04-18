const Post = require('../models/posts.model')

const fetchAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({ postedBy: req.user._id });

        if (posts.length === 0)
            return res.status(404).json({ error: 'posts not found!' })
        res.status(200).json({ data: posts })
    }
    catch (err) {
        next(err)
    }
}

const fetchPostById = async (req, res, next) => {
    try {
        const post = await Post.findOne({ postedBy: req.user._id, _id: req.params.id });

        if (!post)
            return res.status(404).json({ error: 'post not found!' })

        res.status(200).json({ data: post });
    }
    catch (err) {
        next(err)
    }
}

const addPost = async (req, res, next) => {
    try {
        const post = await Post.create({
            ...req.body,
            postedBy: req.user._id
        });
        res.status(201).json({ data: post });
    }
    catch (err) {
        next(err)
    }
}

const updatePost = async (req, res, next) => {
    try {
        const updatedPost = await Post.updateOne({ postedBy: req.user._id, _id: req.params.id }, {
            ...req.body
        }, { runValidators: true });
        if (!updatedPost) {
            return res.status(404).json({ error: 'post not found!' })
        }
        res.status(200).json({ message: 'post updated successfully!' })
    }
    catch (err) {
        next(err)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findOne({ postedBy: req.user._id, _id: req.params.id });
        if (!post)
            return res.status(404).json({ error: 'post not found!' })
        post.deleteOne();
        // const deletedPost = await Post.deleteOne({postedBy : req.user._id, _id : req.params.id})
        // if(!deletedPost) 
        //     return res.status(404).json({error : 'post not found!'})
        res.status(200).json({ message: 'post deleted successfully' })
    }
    catch (err) {
        next(err)
    }
}

const addComment = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found!' })
        }

        post.comments.push({ comment: req.body.comment });
        await post.save();
        res.status(200).json({ data: post });
    }
    catch (err) {
        next(err);
    }
}

const fetchAllCommentsOnPost = async (req, res, next) => {
    try {
        const comments = await Post.findById(req.params.id, {_id : 0, comments : 1});
        if(comments.length === 0){
            return res.status(404).json({error : 'There is no comment on post currently!'})
        }
        res.status(200).json({data : comments});
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    addPost,
    updatePost,
    fetchAllPosts,
    fetchPostById,
    deletePost,
    addComment,
    fetchAllCommentsOnPost
}