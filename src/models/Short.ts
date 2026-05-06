import { model, Schema } from "mongoose";
import type { IShorts } from "../interfaces/short.type.js";

const ShortSchema = new Schema<IShorts>({
    title: { type: String, required: true, },
    content: { type: String, required: true },
    shorts: { type: String, required: true, },
    hashtags: { type: [String], required: true, },
    categories: { type: String, required: true },
    meta: {
        views: { type: Number, default: 0, required: true, },
        rating: { type: Number, default: 0, required: true }
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "ShortComment" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }]
})

const Shorts = model<IShorts>('Shorts', ShortSchema);
export default Shorts;