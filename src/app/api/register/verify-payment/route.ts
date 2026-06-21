import { NextResponse } from "next/server";
import crypto from "crypto";
import { updateRegistrationStatus, getRegistrationByRazorpayOrderId } from "@/lib/db";
import { sendHackathonEmails } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required Razorpay payment attributes." },
        { status: 400 }
      );
    }

    // 1. Verify Razorpay Payment Signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.error("Razorpay signature mismatch.");
      return NextResponse.json({ error: "Invalid payment signature verification." }, { status: 400 });
    }

    console.log(`Razorpay payment signature verified for Order ID: ${razorpay_order_id}`);

    // 2. Update Registration Status to SUCCESS in database
    const updatedReg = updateRegistrationStatus(razorpay_order_id, "SUCCESS", razorpay_payment_id);
    
    if (!updatedReg) {
      return NextResponse.json({ error: "Registration record not found." }, { status: 404 });
    }

    // 3. Send Email Notifications (asynchronously, do not block client response)
    // Satisfies: "If email sending fails: Save registration to database, Show success message, Log email error"
    sendHackathonEmails(updatedReg).then((success) => {
      if (!success) {
        console.error("Transporter failed to send emails, but registration was preserved.");
      } else {
        console.log("Emails sent successfully.");
      }
    });

    return NextResponse.json({
      success: true,
      message: "Payment verified and registration confirmed.",
      registration: updatedReg,
    });
  } catch (error: any) {
    console.error("Verification Endpoint Error:", error);
    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred during verification." },
      { status: 500 }
    );
  }
}
