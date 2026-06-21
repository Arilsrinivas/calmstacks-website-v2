import { NextResponse } from "next/server";
import { getActiveHackathon, addRegistration, getRegistrations, Registration } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      college,
      degree,
      year_of_study,
      team_name,
      team_size,
      github,
      linkedin,
      motivation,
      team_members, // array of additional team members
      hackathonId,
    } = body;

    // 1. Validation
    const size = Number(team_size);
    if (!size || size < 1 || size > 4) {
      return NextResponse.json({ error: "Invalid team size. Must be between 1 and 4." }, { status: 400 });
    }

    if (!fullName || !email || !phone || !college || !degree || !year_of_study || !team_name || !motivation) {
      return NextResponse.json({ error: "Missing required registration fields." }, { status: 400 });
    }

    const additionalMembers = team_members || [];
    if (size > 1 && additionalMembers.length !== size - 1) {
      return NextResponse.json(
        { error: `You must specify details for all ${size - 1} additional team member(s).` },
        { status: 400 }
      );
    }

    // Validate additional team members' required fields
    for (let i = 0; i < additionalMembers.length; i++) {
      const m = additionalMembers[i];
      if (!m.fullName || !m.email || !m.phone || !m.college) {
        return NextResponse.json(
          { error: `Missing required details for Team Member ${i + 2}.` },
          { status: 400 }
        );
      }
    }

    const activeHackathon = getActiveHackathon();
    if (activeHackathon.id !== hackathonId) {
      return NextResponse.json({ error: "Invalid hackathon identifier." }, { status: 400 });
    }

    // 2. Prevent duplicate registrations using email address
    const dbRegistrations = getRegistrations();
    const successfulRegistrations = dbRegistrations.filter(
      (r) => r.hackathonId === hackathonId && r.payment_status === "SUCCESS"
    );

    // Collect all registered emails (primary leaders and team members)
    const registeredEmails = new Set<string>();
    successfulRegistrations.forEach((r) => {
      registeredEmails.add(r.email.toLowerCase().trim());
      if (r.team_members && Array.isArray(r.team_members)) {
        r.team_members.forEach((m) => {
          registeredEmails.add(m.email.toLowerCase().trim());
        });
      }
    });

    // Check leader email
    if (registeredEmails.has(email.toLowerCase().trim())) {
      return NextResponse.json(
        { error: `Email address '${email}' is already registered.` },
        { status: 400 }
      );
    }

    // Check additional member emails
    for (const m of additionalMembers) {
      if (registeredEmails.has(m.email.toLowerCase().trim())) {
        return NextResponse.json(
          { error: `Team member email address '${m.email}' is already registered.` },
          { status: 400 }
        );
      }
    }

    // 3. Calculate amount
    const feePerParticipant = activeHackathon.registrationFee;
    const totalAmount = feePerParticipant * size;
    const amountInPaise = totalAmount * 100;

    // 4. Generate unique registration ID and receipt
    const registrationId = `CS-2026-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    const receiptId = `receipt_${registrationId}`;

    // 5. Create Order via Razorpay API (direct REST call)
    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || "";

    const authString = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64");

    console.log("Calling Razorpay Order Creation API...");
    const rzpResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        receipt: receiptId,
      }),
    });

    if (!rzpResponse.ok) {
      const errorText = await rzpResponse.text();
      console.error("Razorpay Order Creation Failed:", errorText);
      return NextResponse.json(
        { error: "Failed to create payment order with Razorpay." },
        { status: 502 }
      );
    }

    const rzpOrder = await rzpResponse.json();
    const orderId = rzpOrder.id;

    // 6. Save the pending registration in the database
    const newReg: Registration = {
      id: registrationId,
      hackathonId: hackathonId,
      created_at: new Date().toISOString(),
      full_name: fullName,
      email: email,
      phone: phone,
      college: college,
      degree: degree,
      year_of_study: year_of_study,
      team_name: team_name,
      team_size: size,
      github: github || "",
      linkedin: linkedin || "",
      motivation: motivation,
      payment_status: "PENDING",
      payment_id: "",
      team_members: additionalMembers,
      razorpayOrderId: orderId,
    };

    addRegistration(newReg);

    return NextResponse.json({
      success: true,
      orderId: orderId,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      registrationId: registrationId,
    });
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
