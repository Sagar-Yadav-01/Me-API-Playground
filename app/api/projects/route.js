export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Profile from "@/models/Profile";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const skill = searchParams.get("skill");

    const profile = await Profile.findOne({});
    if (!profile) {
      return NextResponse.json([], { status: 200 });
    }

    let projects = profile.projects || [];

    if (skill) {
      const lower = skill.toLowerCase();
      projects = projects.filter(p =>
        p.skills?.some(s => s.toLowerCase() === lower)
      );
    }

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
