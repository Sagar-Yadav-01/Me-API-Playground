import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Missing MONGODB_URI in environment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "meradb",
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB Connected (Mongoose)");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Error", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
