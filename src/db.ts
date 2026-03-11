import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        console.log("Connect MondoDB!")
    } catch (error) {
        console.error(error)
    }
};

export default connectDb