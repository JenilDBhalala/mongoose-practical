const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const auth = require('../middlewares/auth')

router.post('/auth/login', userController.loginUser)

router.post('/auth/logout', auth, userController.logoutUser)

router.get('/me', auth, userController.viewProfile)

router.post('/auth/signup', userController.createProfile)

router.patch('/me',auth,userController.updateProfile)

router.delete('/me', auth, userController.deleteProfile)

module.exports = router;