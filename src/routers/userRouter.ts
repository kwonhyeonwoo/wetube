import express, { type Request, type Response } from "express";
import { handleUserAccount, handleUserEdit, handleUserLogin, handleUserProfile } from "../controllers/userController.js";

const userRouter = express.Router();


userRouter.post('/login', handleUserLogin);
userRouter.post('/account', handleUserAccount);
userRouter.put('/', handleUserEdit);
userRouter.get("/:id", handleUserProfile)

export default userRouter;