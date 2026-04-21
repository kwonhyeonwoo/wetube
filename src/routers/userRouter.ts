import express from "express";
import { getGithubCallback, getGithubLogin, postUserAccount, putUserEdit, postUserLogin, getProfile, postUserPasswordChange, postUserProfile, getMe, getUserVideos, postSaveVideo, userFollow, postUserLogout, } from "../controllers/userController.js";
import { middleware, avatarUploadMiddleware } from "../middleware/middleware.js";

const userRouter = express.Router();
userRouter.get('/me', getMe);
userRouter.post('/login', postUserLogin);
userRouter.post('/logout', postUserLogout);
userRouter.post('/account', postUserAccount);
userRouter.get('/github/login', getGithubLogin);
userRouter.get('/github/callback', getGithubCallback);
userRouter.post('/password-change', middleware, postUserPasswordChange)
userRouter.post('/upload', avatarUploadMiddleware.single('avatar'), postUserProfile)
userRouter.put('/:id', middleware, avatarUploadMiddleware.single('avatar'), putUserEdit);
userRouter.get("/:id", getProfile);
userRouter.post('/:id/follow',middleware,userFollow)
userRouter.get('/:id/videos', getUserVideos);
userRouter.post('/:id/save',middleware,postSaveVideo)
export default userRouter;