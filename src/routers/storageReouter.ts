import express from "express";
import { getStorage, postStorage } from "../controllers/storageController.js";
import { middleware, storageUploadMiddleware } from "../middleware/middleware.js";

const storageRouter = express.Router();

storageRouter.route('/')
    .post(middleware, storageUploadMiddleware.single('thumnail'), postStorage)
    .get(getStorage);

export default storageRouter;