import express from "express";
import { handleVideoDelete, handleVideoUpload, handleVideoWatch } from "../controllers/videoController.js";

const videoRouter = express.Router();

const handleVideoEdit = () => {
    console.log('video edit');
};

videoRouter.get("/:id", handleVideoWatch);
videoRouter.post('/', handleVideoUpload);
videoRouter.delete('/', handleVideoDelete);
videoRouter.put("/", handleVideoEdit)


export default videoRouter;