import express from "express"
import * as userController from "../controllers/user.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post('/auth/login', userController.loginUser)

router.post('/auth/logout', auth, userController.logoutUser)

router.get('/me', auth, userController.viewProfile)

router.post('/auth/signup', userController.createProfile)

router.patch('/me',auth,userController.updateProfile)

router.delete('/me', auth, userController.deleteProfile)

export default router;