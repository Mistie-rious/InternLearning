import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectionURL = process.env.MONGODB_URL;


const connectToMongoDB = async () => {
  try {
    if (connectionURL) {
      await mongoose.connect(connectionURL);
      console.log("Connected to MongoDB");
    } else {
      console.log("MongoDB connection URL is undefined");
    }
  } catch (error: any) {
    console.log("Error connecting to MongoDB: ", error.message);
  }
};

export default connectToMongoDB;
