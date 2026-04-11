import { model, Schema } from "mongoose";
import type { ShortSchema } from "../interfaces/short.type.js";

const ShortSchema = new Schema<ShortSchema>({
    title: { type: String, required: true, },
    content: { type: String, required: true },
    video: { type: String, required: true, },
    hashtags: { type: [String], required: true, },
    categories: { type: String, required: true },
    meta: {
        views: { type: Number, },
        rating: { type: Number }
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

const Shorts = model<ShortSchema>('Shorts', ShortSchema);
export default Shorts;