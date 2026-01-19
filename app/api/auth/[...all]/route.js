import { auth } from "@/lib/auth"; // Alias or relative path
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
