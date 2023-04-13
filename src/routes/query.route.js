const express = require('express');
const router = express.Router();
const queryController = require('../controllers/query.controller')
const auth = require('../middlewares/auth')

router.get('/mostlikedposts', auth, queryController.findFiveMostLikedPosts)

module.exports = router;