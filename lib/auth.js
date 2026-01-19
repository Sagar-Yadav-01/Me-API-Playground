import { betterAuth } from "better-auth";
import { openAPI, bearer } from "better-auth/plugins";
import { MongoClient } from "mongodb";

// Better Auth 1.x MongoDB configuration often requires the client instance
const client = new MongoClient(process.env.MONGODB_URI);

export const auth = betterAuth({
    database: client.db(), // Pass the DB instance directly for better compatibility
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        bearer(),
        openAPI(),
    ],
});
