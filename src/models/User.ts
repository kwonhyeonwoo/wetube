import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import type { IUser } from "User";
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    social: { type: Number, },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    password: { type: String, },
    nickName: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 5)
})

export default model<IUser>('User', userSchema)