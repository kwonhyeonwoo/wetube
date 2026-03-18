import express from "express";

import { deleteVideo, putVideoEdit, getFindOneVideo, postVideoUpload, getSearchVideo } from "../controllers/videoController.js";

const videoRouter = express.Router();


videoRouter.post('/', postVideoUpload);
videoRouter.get('/search', getSearchVideo)
videoRouter.route('/:id')
    .put(putVideoEdit)
    .get(getFindOneVideo)
    .delete(deleteVideo)

export default videoRouter;