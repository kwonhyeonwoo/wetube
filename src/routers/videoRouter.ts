import express from "express";
import { handleVideoDelete, handleVideoEdit, handleVideos, handleVideoUpload, handleVideoWatch } from "../controllers/videoController.js";

const videoRouter = express.Router();



videoRouter.get('/',handleVideos)
videoRouter.post('/', handleVideoUpload);
videoRouter.delete('/', handleVideoDelete);
videoRouter.put("/:id", handleVideoEdit)
videoRouter.get("/:id", handleVideoWatch);


export default videoRouter;