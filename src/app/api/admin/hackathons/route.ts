import { NextResponse } from "next/server";
import { getHackathons, saveHackathon, HackathonConfig, readDb, writeDb } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const passcodeParam = searchParams.get("passcode");
    const authHeader = req.headers.get("Authorization");
    const passcodeHeader = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
    const passcode = passcodeParam || passcodeHeader;
    
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    if (!passcode || passcode !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const hackathons = await getHackathons();
    return NextResponse.json({ success: true, hackathons });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { passcode, hackathon } = body;

    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    if (!passcode || passcode !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (!hackathon || !hackathon.id || !hackathon.name) {
      return NextResponse.json({ error: "Invalid hackathon details. ID and Name are required." }, { status: 400 });
    }

    // Validate fields format
    if (hackathon.fields && !Array.isArray(hackathon.fields)) {
      return NextResponse.json({ error: "Fields must be an array of config objects." }, { status: 400 });
    }

    // If this hackathon is set to active, deactivate all others
    if (hackathon.active) {
      const db = await readDb();
      db.hackathons = db.hackathons.map((h) => ({
        ...h,
        active: h.id === hackathon.id,
      }));
      await writeDb(db);
    }

    // Save this hackathon configuration
    await saveHackathon(hackathon as HackathonConfig);

    return NextResponse.json({ success: true, hackathon });
  } catch (error: any) {
    console.error("Save hackathon error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
