import { NextResponse } from "next/server";
import { getActiveHackathon, addRegistration, getRegistrations, Registration, TeamMember } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { teamSize, members, hackathonId } = body;

    // 1. Validation
    if (!teamSize || ![1, 2, 4].includes(Number(teamSize))) {
      return NextResponse.json(
        { error: "Invalid team size. Must be 1, 2, or 4." },
        { status: 400 }
      );
    }

    if (!members || !Array.isArray(members) || members.length !== Number(teamSize)) {
      return NextResponse.json(
        { error: `Registration details must contain exactly ${teamSize} member(s).` },
        { status: 400 }
      );
    }

    const activeHackathon = getActiveHackathon();
    if (activeHackathon.id !== hackathonId) {
      return NextResponse.json(
        { error: "Invalid hackathon identifier." },
        { status: 400 }
      );
    }

    // Validate required fields based on hackathon config
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      for (const field of activeHackathon.fields) {
        if (field.required && (!member[field.name] || member[field.name].toString().trim() === "")) {
          return NextResponse.json(
            { error: `Field '${field.label}' is required for Member ${i + 1}.` },
            { status: 400 }
          );
        }
      }
    }

    // 2. Prevent duplicate registrations using email address
    // Find all successful registrations
    const dbRegistrations = getRegistrations();
    const successfulRegistrations = dbRegistrations.filter(
      (r) => r.hackathonId === hackathonId && r.paymentStatus === "SUCCESS"
    );

    // Get a set of all successfully registered emails
    const registeredEmails = new Set(
      successfulRegistrations.flatMap((r) =>
        r.members.map((m) => m.email.toLowerCase().trim())
      )
    );

    // Check if any of the incoming members' emails is already registered
    for (const member of members) {
      const email = member.email.toLowerCase().trim();
      if (registeredEmails.has(email)) {
        return NextResponse.json(
          { error: `The email address '${member.email}' is already registered for this hackathon.` },
          { status: 400 }
        );
      }
    }

    // 3. Calculate amount
    // Registration fee is per participant.
    const feePerParticipant = activeHackathon.registrationFee;
    const totalAmount = feePerParticipant * Number(teamSize);

    // 4. Generate unique registration and order IDs
    const registrationId = `CS-2026-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    const orderId = `CF_${registrationId}_${Date.now()}`;

    // Team Leader (first member) details for Cashfree customer object
    const leader: TeamMember = members[0];
    const customerId = `CUST_${crypto.randomBytes(6).toString("hex").toUpperCase()}`;
    const customerPhone = leader.phone.replace(/[^0-9]/g, ""); // strip non-numeric
    
    // Validate phone number length (Cashfree requires a valid phone number format)
    const validPhone = customerPhone.length >= 10 ? customerPhone.slice(-10) : "9999999999";

    // 5. Create Order via Cashfree API
    const isProd = process.env.CASHFREE_ENV === "production";
    const cfBaseUrl = isProd
      ? "https://api.cashfree.com/pg/orders"
      : "https://sandbox.cashfree.com/pg/orders";

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const cashfreeRequest = {
      order_amount: totalAmount,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: customerId,
        customer_name: leader.fullName,
        customer_email: leader.email,
        customer_phone: validPhone,
      },
      order_meta: {
        return_url: `${appUrl}/innovation-challenge/success?order_id=${orderId}`,
      },
    };

    console.log("Calling Cashfree API at:", cfBaseUrl);
    
    const response = await fetch(cfBaseUrl, {
      method: "POST",
      headers: {
        "x-api-version": "2023-08-01",
        "x-client-id": process.env.CASHFREE_CLIENT_ID || "",
        "x-client-secret": process.env.CASHFREE_CLIENT_SECRET || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cashfreeRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cashfree Order Creation Failed:", errorText);
      return NextResponse.json(
        { error: "Failed to initiate payment gateway order. Please try again." },
        { status: 502 }
      );
    }

    const orderData = await response.json();
    const paymentSessionId = orderData.payment_session_id;

    if (!paymentSessionId) {
      console.error("No payment_session_id returned from Cashfree:", orderData);
      return NextResponse.json(
        { error: "Payment gateway did not issue a session. Please try again." },
        { status: 502 }
      );
    }

    // 6. Record the pending registration in the database
    const newReg: Registration = {
      id: registrationId,
      hackathonId: hackathonId,
      teamSize: Number(teamSize),
      members: members,
      cashfreeOrderId: orderId,
      paymentStatus: "PENDING",
      paymentAmount: totalAmount,
      registeredAt: new Date().toISOString(),
    };

    addRegistration(newReg);

    return NextResponse.json({
      success: true,
      paymentSessionId,
      orderId,
      registrationId,
    });
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred during registration." },
      { status: 500 }
    );
  }
}
