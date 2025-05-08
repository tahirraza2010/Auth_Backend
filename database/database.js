import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    mongoose.connect(MONGODB_URI);

    mongoose.connection.on("connected", () => {
      console.log("mongodb connected..");
    });

    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
};