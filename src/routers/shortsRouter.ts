import express from "express"
import { postShorts } from "../controllers/shortsController.js";
import { middleware, shortsUploadMiddleware, videoUploadMiddleware } from "../middleware/middleware.js";
const shortsRouter = express.Router();
shortsRouter.post(
  "/",
  middleware,
  shortsUploadMiddleware.single("shorts"),
  postShorts,
);

export default shortsRouter;