import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Profile from '@/models/Profile';
import { checkAuth } from '@/lib/auth-guard';

export async function GET() {
    try {
        await dbConnect();
        const profile = await Profile.findOne({});
        if (!profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }
        return NextResponse.json(profile, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await checkAuth(); // Protected
        await dbConnect();
        const body = await request.json();


        const existing = await Profile.findOne({});
        if (existing) {
            Object.assign(existing, body);
            await existing.save();
            return NextResponse.json(existing, { status: 200 });
        } else {
            const profile = await Profile.create(body);
            return NextResponse.json(profile, { status: 201 });
        }

    } catch (error) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await checkAuth(); // Protected
        await dbConnect();
        const body = await request.json();

        const profile = await Profile.findOne({});
        if (!profile) {
            const newProfile = await Profile.create(body);
            return NextResponse.json(newProfile, { status: 201 });
        }
        Object.assign(profile, body);
        await profile.save();

        return NextResponse.json(profile, { status: 200 });
    } catch (error) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
