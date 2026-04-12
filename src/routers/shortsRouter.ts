import express from "express"
import { getShorts, postShorts } from "../controllers/shortsController.js";
import { middleware, shortsUploadMiddleware } from "../middleware/middleware.js";
const shortsRouter = express.Router();
shortsRouter.route("/")
  .post(middleware,
    shortsUploadMiddleware.single("shorts"),
    postShorts
  )
  .get(getShorts)

export default shortsRouter;