import express from "express";
<<<<<<< HEAD
import { handleVideoDelete, handleVideoEdit, handleVideos, handleVideoUpload, handleVideoWatch } from "../controllers/videoController.js";

const videoRouter = express.Router();



videoRouter.get('/',handleVideos)
videoRouter.post('/', handleVideoUpload);
videoRouter.delete('/', handleVideoDelete);
videoRouter.put("/:id", handleVideoEdit)
videoRouter.get("/:id", handleVideoWatch);
=======
import { handleVideoDelete, handleVideoEdit, handleVideoFind, handleVideoUpload, handleVideoWatch } from "../controllers/videoController.js";

const videoRouter = express.Router();

videoRouter.put("/:id", handleVideoEdit)
videoRouter.get("/:id", handleVideoFind);
videoRouter.post('/', handleVideoUpload);
videoRouter.delete('/', handleVideoDelete);
>>>>>>> dbf3f643eff491cdaca4d20ea17ff68353c7b2c5


export default videoRouter;