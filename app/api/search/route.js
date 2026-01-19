import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Profile from '@/models/Profile';

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const q = searchParams.get('q');

        if (!q) {
            return NextResponse.json({ results: [] }, { status: 200 });
        }

        const query = q.toLowerCase();
        const profile = await Profile.findOne({});

        if (!profile) {
            return NextResponse.json({ results: [] }, { status: 200 });
        }

        // Search in projects
        const matchedProjects = profile.projects.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.skills.some(s => s.toLowerCase().includes(query))
        );

        return NextResponse.json({ results: matchedProjects }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
