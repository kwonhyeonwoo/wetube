import express from "express";
import { postComment } from "../controllers/commentController.js";
import { middleware } from "../middleware/middleware.js";
const commentRouter = express.Router()

commentRouter.post('/:videoId',middleware,postComment)

export default commentRouter;