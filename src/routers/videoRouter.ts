import express from "express";

import { deleteVideo, putVideo, postVideoUpload, findOneVideo, getVideos } from "../controllers/videoController.js";
import { middleware, videoUploadMiddleware } from "../middleware/middleware.js";

const videoRouter = express.Router();
videoRouter
  .route("/")
  .get(getVideos)
  .all(middleware)
  .post(videoUploadMiddleware.single("video"), postVideoUpload)
  .delete(deleteVideo);

videoRouter.route('/:id')
.get(findOneVideo)
.put(middleware,videoUploadMiddleware.single('video'),putVideo)

export default videoRouter;