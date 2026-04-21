import { model, Schema } from "mongoose";
import type { IComment } from "../interfaces/comment.type.js";

const CommentSchema = new Schema<IComment>({
    comment:{type:String, required:true},
    owner:{type:Schema.Types.ObjectId, ref:"User",required:true},
    video:{type:Schema.Types.ObjectId, ref:"Video",required:true},
    createdAt:{type:Date, default:Date.now}
});

export const Comment = model('Comment',CommentSchema);