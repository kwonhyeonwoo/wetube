import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nickName: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 5)
})

export default model<IUser>('User', userSchema)