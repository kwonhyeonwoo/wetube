import express from "express";
import { getStorageVideos, getUserStorages, postStorage } from "../controllers/storageController.js";
import { middleware, storageUploadMiddleware } from "../middleware/middleware.js";

const storageRouter = express.Router();

storageRouter.route('/')
    .post(middleware, storageUploadMiddleware.single('thumnail'), postStorage);
storageRouter.get('/videos/:id',getStorageVideos)
storageRouter.get("/:id",getUserStorages)

export default storageRouter;