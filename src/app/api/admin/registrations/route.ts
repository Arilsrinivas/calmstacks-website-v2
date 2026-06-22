import { NextResponse } from "next/server";
import { getRegistrations } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Auth Check: accept parameter in query string or Authorization header or cookie
    const passcodeParam = searchParams.get("passcode");
    const authHeader = req.headers.get("Authorization");
    const passcodeHeader = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
    
    const passcode = passcodeParam || passcodeHeader;
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (!passcode || passcode !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized access. Invalid passcode." }, { status: 401 });
    }

    const registrations = await getRegistrations();
    
    // Sort by registration date descending
    registrations.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({ success: true, registrations });
  } catch (error: any) {
    console.error("Admin registrations fetch error:", error);
    return NextResponse.json(
      { error: error?.message || "An error occurred fetching registrations." },
      { status: 500 }
    );
  }
}
