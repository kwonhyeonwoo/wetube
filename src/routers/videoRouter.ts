import express from "express";

import { deleteVideo, putVideo, postVideoUpload, findOneVideo, getVideos, postVideoLike, postVideoViews, postVideoSave, getVideoSave } from "../controllers/videoController.js";
import { middleware, videoUploadMiddleware } from "../middleware/middleware.js";

const videoRouter = express.Router();
videoRouter
  .route("/")
  .get(getVideos)
  .all(middleware)
  .post(videoUploadMiddleware.single("video"), postVideoUpload)
  .delete(deleteVideo);
videoRouter.get("/saved", getVideoSave);

videoRouter.route('/:id')
.get(findOneVideo)
.put(middleware,videoUploadMiddleware.single('video'),putVideo);

videoRouter.post('/:id/views',postVideoViews);

videoRouter.post('/:id/like', middleware, postVideoLike);
videoRouter.post("/:id/save", middleware, postVideoSave)
export default videoRouter;