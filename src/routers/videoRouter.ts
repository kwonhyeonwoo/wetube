import express from "express";
import { handleVideoDelete, handleVideoEdit, handleVideoFind, handleVideoUpload, handleVideoWatch } from "../controllers/videoController.js";

const videoRouter = express.Router();

videoRouter.put("/:id", handleVideoEdit)
videoRouter.get("/:id", handleVideoFind);
videoRouter.post('/', handleVideoUpload);
videoRouter.delete('/', handleVideoDelete);


export default videoRouter;