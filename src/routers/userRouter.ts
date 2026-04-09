import express from "express";
import { getGithubCallback, getGithubLogin, postUserAccount, putUserEdit, postUserLogin, getProfile, postUserPasswordChange, postUserProfile, getMe, } from "../controllers/userController.js";
import { middleware, avatarUploadMiddleware } from "../middleware/middleware.js";

const userRouter = express.Router();
// 
userRouter.get('/me',getMe);
userRouter.post('/login', postUserLogin);
userRouter.post('/account', postUserAccount);
userRouter.put('/edit', middleware, putUserEdit);
userRouter.get('/github/login', getGithubLogin);
userRouter.get('/github/callback', getGithubCallback);
userRouter.post('/password-change', middleware, postUserPasswordChange)
userRouter.post('/upload', avatarUploadMiddleware.single('avatar'), postUserProfile)
userRouter.get("/:id", getProfile);

export default userRouter;