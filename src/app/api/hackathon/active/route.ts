import { NextResponse } from "next/server";
import { getActiveHackathon } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const activeHackathon = await getActiveHackathon();
    return NextResponse.json({
      success: true,
      hackathon: activeHackathon,
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
    });
  } catch (error: any) {
    console.error("Fetch active hackathon error:", error);
    return NextResponse.json(
      { error: "Failed to fetch active hackathon details." },
      { status: 500 }
    );
  }
}
