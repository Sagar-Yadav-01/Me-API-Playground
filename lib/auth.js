import { betterAuth } from "better-auth";
import { openAPI, bearer } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Missing MONGODB_URI for Better Auth");
}

const client = new MongoClient(MONGODB_URI);

export const auth = betterAuth({
  database: client.db("meradb"),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    bearer(),
    openAPI(),
  ],
});
