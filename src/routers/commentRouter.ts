import express from "express";
import { getComment, postComment } from "../controllers/commentController.js";
import { middleware } from "../middleware/middleware.js";
const commentRouter = express.Router()

commentRouter.route('/:videoId')
    .post(middleware, postComment)
    .get(getComment)

export default commentRouter;