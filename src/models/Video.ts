import { model, Schema } from "mongoose";
import type { IVideo } from "../@types/video.js";
const videoSchema = new Schema<IVideo>({
    video: { type: String, },
    title: { type: String, required: true, trim: true, },
    categories:{type:String, require:true,},
    content: { type: String, required: true, },
    meta: {
        views: { type: Number, default: 0, },
        rating: { type: Number, default: 0 }
    },
    hashtags: [{ type: String, required: false, default: [] }],
    createdAt: { type: Date, default: Date.now, },
    updatedAt: { type: Date, default: Date.now, },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes:[{type:Schema.Types.ObjectId, ref:"User"}],
    comments:[{type:Schema.Types.ObjectId, ref:"Comment"}]
})

const Video = model<IVideo>('Video', videoSchema)
export default Video;