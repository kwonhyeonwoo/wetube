import express, { type Request, type Response } from "express";
import { handleUserAccount, handleUserEdit, handleUserLogin, handleUserProfile } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/', (req: Request, res: Response) => {
    return res.send("userRouter")
});
userRouter.post('/login', handleUserLogin);
userRouter.post('/account', handleUserAccount);
userRouter.put('/', handleUserEdit);
userRouter.get("/:id", handleUserProfile);

export default userRouter;