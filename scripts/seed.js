import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Profile from '../models/Profile.js';

// process.cwd() is usually the project root when running from root
// But to be safe let's load .env.local explicitly
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

const seedData = {
    name: 'Sagar Yadav',
    email: 'sagar230306@gmail.com',
    education: [
        {
            institution: 'National Institute of Technology Delhi',
            degree: 'B.Tech Electrical Engineering',
            year: 2027,
        },
    ],
    skills: ['JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'C++'],
    projects: [
        {
            title: 'Bologee',
            description: 'Developed a real-time chat application enabling secure user authentication, instant messaging, and responsive UI, focusing on smooth user experience, scalability, and efficient frontend–backend communication.',
            links: ['https://github.com/Sagar-Yadav-01/Bologee'],
            skills: ['Next.js', 'MongoDB', 'Better Auth', 'Tailwind CSS', 'Socket.io'],
        },
        {
            title: 'Fuel-EU',
            description: 'Designed and analyzed a framework to support FuelEU Maritime compliance by evaluating fuel efficiency, emission reduction strategies, and regulatory alignment for sustainable maritime operations.',
            links: ['https://github.com/Sagar-Yadav-01/Fuel-EU'],
            skills: ['React', 'Node.js', 'Socket.io'],
        },
    ],
    work: [
        {
            company: 'Codtech IT Solutions',
            role: 'Frontend Developer',
            duration: '2 months',
            description: 'Developed responsive and user-friendly web interfaces using HTML, CSS, JavaScript, and React. Collaborated with cross-functional teams to deliver scalable, performance-optimized frontend solutions aligned with business requirements.',
        },
    ],
    links: {
        github: 'https://github.com/Sagar-Yadav-01',
        linkedin: 'https://www.linkedin.com/in/sagar-yadav-96560a321/',
    },
};

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Profile.deleteMany({});
        console.log('Cleared existing profiles');

        // Insert new data
        await Profile.create(seedData);
        console.log('Seeded profile data');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
