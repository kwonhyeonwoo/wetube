import express from "express"
import { getShorts, postLikeShorts, postShorts } from "../controllers/shortsController.js";
import { middleware, shortsUploadMiddleware } from "../middleware/middleware.js";
const shortsRouter = express.Router();
shortsRouter.route("/")
  .post(middleware,
    shortsUploadMiddleware.single("shorts"),
    postShorts
  )
  .get(getShorts)

shortsRouter.route("/like/:shortsId")
  .post(middleware, postLikeShorts)
export default shortsRouter;