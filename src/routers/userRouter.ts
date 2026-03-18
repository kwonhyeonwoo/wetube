import express, { type Request, type Response } from "express";
import { getGithubCallback, getGithubLogin, postUserAccount, putUserEdit, postUserLogin, handleUserProfile, postUserPasswordChange, postUserProfile, } from "../controllers/userController.js";
import { middleware, avatarUploadMiddleware } from "../middleware/middleware.js";

const userRouter = express.Router();

userRouter.get('/', (req: Request, res: Response) => {
    return res.send("userRouter")
});
userRouter.post('/login', postUserLogin);
userRouter.post('/account', postUserAccount);
userRouter.put('/edit', middleware, putUserEdit);
userRouter.get('/github/login', getGithubLogin);
userRouter.get('/github/callback', getGithubCallback);
userRouter.post('/password-change', middleware, postUserPasswordChange)
userRouter.post('/upload', avatarUploadMiddleware.single('avatar'), postUserProfile)
userRouter.get("/:id", handleUserProfile);

export default userRouter;