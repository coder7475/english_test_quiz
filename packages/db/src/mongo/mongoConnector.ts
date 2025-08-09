import mongoose from "mongoose";

let isConnected = false;

/**
 * Connect to MongoDB using Mongoose.
 * @param uri MongoDB connection string
 */
export async function mongoConnector(uri: string) {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  mongoose.set("strictQuery", false); // optional, for flexibility

  try {
    await mongoose.connect(uri, {
      // Add options if needed
      serverSelectionTimeoutMS: 10000, // 10s timeout for connecting
    });

   

    // Listen for connection events
    mongoose.connection.on("connected", () => {
      console.log("🟢 MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("🔴 MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
