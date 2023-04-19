const express = require('express');
const router = express.Router();
const queryController = require('../controllers/query.controller')
const auth = require('../middlewares/auth')

router.get('/posts/:id/comment', auth, queryController.findCommentsOfLast4Days)

module.exports = router;