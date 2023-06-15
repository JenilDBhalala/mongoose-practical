const postService = require('../services/post.service')

const fetchAllPosts = async (req, res, next) => {
    try {
        const posts = await postService.fetchAllPosts(req.user)
        res.status(200).json({ data: posts })
    }
    catch (err) {
        next(err)
    }
}


const fetchPostById = async (req, res, next) => {
  try {
    const post = await postService.fetchPostById(req.user, req.params.id);
    res.status(200).json({ data: post });
  } catch (err) {
    next(err);
  }
};

const addPost = async (req, res, next) => {
  try {
    const post = await postService.addPost(req.body, req.user);
    res.status(201).json({ data: post });
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const message = await postService.updatePost(req.body, req.params.id);
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const message = await postService.deletePost(req.user, req.params);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const addComment = async (req, res, next) => {
  try {
    const post = await postService.addComment(
      req.params.id,
      req.body,
      req.user
    );
    res.status(200).json({ data: post });
  } catch (err) {
    next(err);
  }
};

const fetchAllCommentsOnPost = async (req, res, next) => {
  try {
    const comments = await postService.fetchAllCommentsOnPost(req.params.id);
    res.status(200).json({ data: comments });
  } catch (err) {
    next(err);
  }
};


//finding latest comments using aggregate pipeline with pagination, sorting and projection
const findLatestComments = async (req, res, next) => {
  try {
      const comments = await postService.findLatestComments(req.params.id, req.query)
      res.status(200).json({ data: comments })
  }
  catch (err) {
      next(err)
  }
}

//finding counts of post with specific tag 
const countOfPosts = async (req, res, next) => {
  try {
      const posts = await postService.countOfPosts();
      res.status(200).json({ data: posts });
  }
  catch (err) {
      next(err)
  }
}


module.exports = {
    addPost,
    updatePost,
    fetchAllPosts,
    fetchPostById,
    deletePost,
    addComment,
    fetchAllCommentsOnPost,
    findLatestComments,
    countOfPosts
}