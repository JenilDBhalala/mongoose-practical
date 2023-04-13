const Post = require('../models/posts.model')

module.exports = {
    fetchAllPosts : async(req, res, next) => {
        try{    
            const posts = await Post.find({postedBy : req.user._id});

            if(posts.length === 0)
                return res.status(404).json({error : 'posts not found!'})
            res.status(200).json({data : posts})
        }
        catch(err){
            next(err)
        }
    },
    fetchPostById : async(req, res, next) => {
        try{
            const post = await Post.findOne({postedBy : req.user._id, _id : req.params.id});

            if(!post) 
                return res.status(404).json({error : 'post not found!'})
            
            res.status(200).json({data : post});
        }
        catch(err){
            next(err)
        }
    },
    addPost : async(req, res, next) => {
        try{
            const post = await Post.create({
                ...req.body, 
                postedBy : req.user._id
            });
            res.status(201).json({data : post});
        }
        catch(err){
            next(err)
        }
    },
    updatePost : async(req, res, next) => {
        try{
            const updatedPost = await Post.updateOne({postedBy : req.user._id, _id : req.params.id}, {
                ...req.body
            }, {runValidators: true});
            if(!updatedPost){
                return res.status(404).json({error : 'post not found!'})
            }
            res.status(200).json({message : 'post updated successfully!'})
        }
        catch(err){
            next(err)
        }
    },
    deletePost : async(req, res, next) => {
        try{
            const deletedPost = await Post.deleteOne({postedBy : req.user._id, _id : req.params.id})
            if(!deletedPost) 
                return res.status(404).json({error : 'post not found!'})
            res.status(200).json({message : 'post deleted successfully'})
        }
        catch(err){
            next(err)
        }
    },
}