import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Use global caching in serverless (Vercel) to survive cold starts
let cached: MongooseCache = (global as any).mongooseCache || {
  conn: null,
  promise: null,
};

export async function mongoConnector(uri: string) {
  if (!uri) {
    throw new Error("❌ MongoDB connection URI is missing");
  }

  // Return existing connection
  if (cached.conn) {
    console.log("=> Using existing MongoDB connection");
    return cached.conn;
  }

  // Create new connection promise if not already started
  if (!cached.promise) {
    mongoose.set("strictQuery", false);

    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // Fail fast if no connection
    }).then((mongooseInstance) => {
      console.log("✅ MongoDB connected");
      return mongooseInstance;
    }).catch((err) => {
      console.error("🔴 MongoDB connection failed:", err);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; // Reset so next try starts fresh
    throw err;
  }

  // Store in global for serverless
  (global as any).mongooseCache = cached;
  return cached.conn;
}
