import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb+srv://agarwalg131:oxtDJEmpOc56oTE0@cluster0.csnbgsa.mongodb.net/");
        console.log("MongoDB connection successful");
    } catch (error) {
        console.log("MongoDB connection failed : " + error);
    };
}

export { connectDB };