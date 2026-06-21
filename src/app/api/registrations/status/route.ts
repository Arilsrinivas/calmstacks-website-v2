import { NextResponse } from "next/server";
import { getRegistrationById } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const regId = searchParams.get("registration_id") || searchParams.get("order_id");

    if (!regId) {
      return NextResponse.json({ error: "registration_id parameter is required." }, { status: 400 });
    }

    const registration = getRegistrationById(regId);
    if (!registration) {
      return NextResponse.json({ error: "Registration not found." }, { status: 404 });
    }

    return NextResponse.json({
      status: registration.payment_status,
      registration,
    });
  } catch (error: any) {
    console.error("Status check API error:", error);
    return NextResponse.json(
      { error: error?.message || "An error occurred checking registration status." },
      { status: 500 }
    );
  }
}
