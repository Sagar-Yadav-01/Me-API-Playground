import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Profile from '@/models/Profile';

export async function GET() {
    try {
        await connectDB();
        const profile = await Profile.findOne({}, { skills: 1 });

        if (!profile) {
            return NextResponse.json([], { status: 200 });
        }

        // Just return the explicitly listed skills
        return NextResponse.json(profile.skills, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
