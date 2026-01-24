import { model, Schema } from "mongoose";
import type { IVideo } from "../@types/video.js";
const videoSchema = new Schema<IVideo>({
    title: { type: String, required: true , trim:true, maxLength:80},
    content: { type: String, required: true , maxLength : 140},
    meta: {
        views: { type: Number, default:0, },
        rating: { type: Number, default:0 }
    },
    hashtags: [{ type: String }],
    createdAt: { type: Date , default:Date.now,},
    updatedAt: { type: Date , default: Date.now,},
})

const Video = model<IVideo>('Video', videoSchema)
export default Video;