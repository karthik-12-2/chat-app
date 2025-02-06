import mongoose from "mongoose";

const createConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("MongoDB connected successfully");
    return connection;
  } catch (error) {
    console.log("Database connection failed", error.message);
  }
};


export default createConnection;
