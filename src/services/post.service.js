const Post = require('../models/posts.model')
const { NotFoundError } = require('../error')

const fetchAllPosts = async (user) => {
    const posts = await Post.find({ postedBy: user._id });

    if (posts.length === 0)
        throw new NotFoundError('posts not found!');

    return posts;
}

const fetchPostById = async (user, params) => {
    const post = await Post.findOne({ postedBy: user._id, _id: params.id });

    if (!post)
        throw new NotFoundError('post not found!');

    return post;
}


const addPost = async (body, user) => {
    const post = await Post.create({
        ...body,
        postedBy: user._id
    });
    return post;
}


const updatePost = async (body, params) => {
    const post = await Post.findById(params.id);

    if (!post) {
        throw new NotFoundError('post not found!');
    }
    await post.updateOne({
        ...body
    }, { runValidators: true });
}


const deletePost = async (user, params) => {
    const post = await Post.findOne({ postedBy: user._id, _id: params.id });

    if (!post)
        throw new NotFoundError('post not found!');

    post.deleteOne();
}


const addComment = async (params, body, user) => {
    const post = await Post.findById(params.id);

    if (!post) {
        throw new NotFoundError('post not found!');
    }

    post.comments.push({ comment: body.comment, commentBy: user._id });
    await post.save();

    return post;
}


const fetchAllCommentsOnPost = async (params) => {
    const { comments } = await Post.findById(params.id)
        .populate('comments.commentBy', { _id: 0, username: 1 });

    if (comments.length === 0) {
        throw new NotFoundError('There is no comment on post currently!')
    }
    return comments;
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