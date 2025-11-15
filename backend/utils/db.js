import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected succesfully");
  } catch (error) {
    console.log("error while connecting");
  }
};

export default connectDB;
