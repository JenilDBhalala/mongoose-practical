const queryService = require('../services/query.service')

//finding latest comments using aggregate pipeline with pagination, sorting and projection
const findLatestComments = async (req, res, next) => {
    try {
        const comments = await queryService.findLatestComments(req.params, req.query)
        res.status(200).json({ data: comments })
    }
    catch (err) {
        next(err)
    }
}

const searchByUsername = async (req, res, next) => {
    try {
        const users = await queryService.searchByUsername(req.query)
        res.status(200).json({ data: users })
    }
    catch (err) {
        next(err)
    }
}

//finding counts of post with specific tag 
const countOfPosts = async (req, res, next) => {
    try {
        const posts = await queryService.countOfPosts();
        res.status(200).json({ data: posts });
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    findLatestComments,
    searchByUsername,
    countOfPosts
}