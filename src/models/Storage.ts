import { model, Schema } from "mongoose";

const StorageSchema = new Schema({
    thumnail: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }]
});

export const Storage = model('Storage', StorageSchema);