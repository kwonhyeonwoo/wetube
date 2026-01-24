import express from "express";

import { handleVideoDelete, handleVideoEdit, handleVideoFind, handleVideoUpload, handleVideoWatch } from "../controllers/videoController.js";

const videoRouter = express.Router();


videoRouter.post('/', handleVideoUpload);
videoRouter.route('/:id')
    .put(handleVideoEdit)
    .get(handleVideoFind)
    .delete(handleVideoDelete)

export default videoRouter;