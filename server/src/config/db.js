import mongoose from "mongoose"
export const connectDB = async () => {
  try {
    const mongoURI =
      process.env.NODE_ENV === "development"
        ? process.env.MONGODB_TEST_URI
        : process.env.MONGODB_URI;

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Unable to connect to MongoDB:", error.message);
    process.exit(1);
  }
};
