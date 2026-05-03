import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import type { IUser } from "User";
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    social: { type: Number, },
    email: { type: String, required: true, unique: true },
    introduction: { type: String, },
    avatar: { type: String },
    password: { type: String, },
    nickName: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    shorts: [{ type: Schema.Types.ObjectId, ref: "Shorts" }],
    likeVideos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    saveVideos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    shortsComments: [{ type: Schema.Types.ObjectId, ref: "ShortComment" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }], // 내가 팔로우 하는 사람들
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }] // 나를 팔로우 하는 사람들
});

// userSchema.pre('save', async function () {
//     this.password = await bcrypt.hash(this.password, 5)
// })

export default model<IUser>('User', userSchema)