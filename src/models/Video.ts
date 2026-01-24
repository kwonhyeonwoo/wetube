import { model, Schema } from "mongoose";
import type { IVideo } from "../@types/video.js";
const videoSchema = new Schema<IVideo>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    meta: {
        views: { type: Number },
        rating: { type: Number }
    },
    hashtags: [{ type: String }],
    createdAt: { type: Date },
    updatedAt: { type: Date },
})

const Video = model<IVideo>('Video', videoSchema)
export default Video;