import { NextResponse } from "next/server";
import { getRegistrationById, updateRegistrationStatus } from "@/lib/db";
import { sendParticipantConfirmation } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { passcode, registrationId, paymentId } = body;

    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    if (!passcode || passcode !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (!registrationId) {
      return NextResponse.json({ error: "Registration ID is required." }, { status: 400 });
    }

    const reg = await getRegistrationById(registrationId);
    if (!reg) {
      return NextResponse.json({ error: "Registration not found." }, { status: 404 });
    }

    // Update status to SUCCESS (Confirmed)
    const txId = paymentId || `MANUAL_${Date.now()}`;
    const updatedReg = await updateRegistrationStatus(registrationId, "SUCCESS", txId);

    if (!updatedReg) {
      return NextResponse.json({ error: "Failed to update status." }, { status: 500 });
    }

    // Send confirmation email to participant (asynchronously)
    sendParticipantConfirmation(updatedReg).then((success) => {
      if (!success) {
        console.error("Nodemailer failed to email participant, but registration status was successfully marked as SUCCESS.");
      }
    });

    return NextResponse.json({
      success: true,
      message: "Registration approved and participant notified.",
      registration: updatedReg,
    });
  } catch (error: any) {
    console.error("Approval API error:", error);
    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
