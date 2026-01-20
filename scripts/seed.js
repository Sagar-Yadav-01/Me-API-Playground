import mongoose from "mongoose";
import dotenv from "dotenv";
import Profile from "../models/Profile.js";

dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found");
  process.exit(1);
}

const seedData = {
  name: "Sagar Yadav",
  email: "sagar230306@gmail.com",
  education: [
    {
      institution: "National Institute of Technology Delhi",
      degree: "B.Tech Electrical Engineering",
      year: 2027,
    },
  ],
  skills: [
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "MongoDB",
    "C++",
  ],
  projects: [
    {
      title: "Bologee",
      description:
        "Real-time chat app with auth and sockets.",
      links: ["https://github.com/Sagar-Yadav-01/Bologee"],
      skills: ["Next.js", "MongoDB", "Better Auth", "Socket.io"],
    },
  ],
  work: [
    {
      company: "Codtech IT Solutions",
      role: "Frontend Developer",
      duration: "2 months",
      description: "Frontend development using React.",
    },
  ],
  links: {
    github: "https://github.com/Sagar-Yadav-01",
    linkedin: "https://www.linkedin.com/in/sagar-yadav-96560a321/",
  },
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: "meradb" });
    console.log("✅ Connected to MongoDB for seeding");

    await Profile.deleteMany({});
    console.log("🧹 Cleared existing profiles");

    await Profile.create(seedData);
    console.log("🌱 Database seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
