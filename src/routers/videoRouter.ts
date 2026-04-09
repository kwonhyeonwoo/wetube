import express from "express";

import { deleteVideo, putVideo, getFindOneVideo, postVideoUpload, getSearchVideo, findOneVideo } from "../controllers/videoController.js";
import { middleware, videoUploadMiddleware } from "../middleware/middleware.js";

const videoRouter = express.Router();

videoRouter.route('/')
    .all(middleware)
    .post( videoUploadMiddleware.single('video'),postVideoUpload)
    .put(putVideo)
    .delete(deleteVideo)

videoRouter.get('/search', getSearchVideo);
videoRouter.get('/:id', findOneVideo);

export default videoRouter;