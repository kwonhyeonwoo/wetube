import express from "express";
import { deleteShortComment, getShortComment, postShortComment } from "../controllers/shortsCommentController.js";
import { middleware } from "../middleware/middleware.js";
const shortsCommentRouter = express.Router();


shortsCommentRouter.get('/', getShortComment);
shortsCommentRouter.route('/:shortsId')
    .all(middleware)
    .post(postShortComment)
    .delete(deleteShortComment)


export default shortsCommentRouter;