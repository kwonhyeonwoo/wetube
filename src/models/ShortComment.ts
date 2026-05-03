import { model, Schema } from "mongoose";
import type { ShortCommentSchema } from "../interfaces/short.type.js";

const ShortCommentSchema = new Schema({
    comment: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    shorts: { type: Schema.Types.ObjectId, ref: "Shorts", required: true },
    createdAt: { type: Date, default: Date.now },
});

const ShortComment = model<ShortCommentSchema>('ShortComment', ShortCommentSchema);
export default ShortComment;