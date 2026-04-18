import express from "express";
import { getGithubCallback, getGithubLogin, postUserAccount, putUserEdit, postUserLogin, getProfile, postUserPasswordChange, postUserProfile, getMe, getUserVideos, } from "../controllers/userController.js";
import { middleware, avatarUploadMiddleware } from "../middleware/middleware.js";

const userRouter = express.Router();
userRouter.get('/me', getMe);
userRouter.post('/login', postUserLogin);
userRouter.post('/account', postUserAccount);
userRouter.get('/github/login', getGithubLogin);
userRouter.get('/github/callback', getGithubCallback);
userRouter.post('/password-change', middleware, postUserPasswordChange)
userRouter.post('/upload', avatarUploadMiddleware.single('avatar'), postUserProfile)
userRouter.put('/:id', middleware, avatarUploadMiddleware.single('avatar'), putUserEdit);
userRouter.get("/:id", getProfile);
userRouter.get('/:id/videos', getUserVideos);
export default userRouter;