import express from "express"
import { postShorts } from "../controllers/shortsController.js";
import { middleware, videoUploadMiddleware } from "../middleware/middleware.js";
const shortsRouter = express.Router();
shortsRouter.post(
  "/",
  middleware,videoUploadMiddleware.single("video"),
  postShorts,
);

export default shortsRouter;