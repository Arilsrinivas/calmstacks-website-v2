import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      usn,
      email,
      phone,
      yearSemester,
      teamName,
      teamSize,
      trackPreference,
      projectIdea,
    } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !usn || !teamName) {
      return NextResponse.json(
        { error: "Missing required registration fields" },
        { status: 400 }
      );
    }

    // Format phone: Prepend single quote (') for Google Sheets so '+' isn't parsed as a math formula (#ERROR!)
    const cleanPhone = phone.toString().trim();
    const sheetPhone = cleanPhone.startsWith("'") ? cleanPhone : `'${cleanPhone}`;

    const payload = {
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      fullName,
      usn,
      email,
      phone: sheetPhone,
      yearSemester: yearSemester || "N/A",
      teamName,
      teamSize: teamSize || "Team of 4 Members (₹1,200 total)",
      trackPreference: trackPreference || "General Track",
      projectIdea: projectIdea || "To be finalized",
    };

    const DEFAULT_GOOGLE_SHEETS_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbypb1qgXc6g_Htu7CNGeqDpkKtPh1adLel_KRs4T8H8kShooLWlTeUUare7tCgVV0ZY/exec";

    const googleSheetScriptUrl =
      process.env.GOOGLE_SHEETS_SCRIPT_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL ||
      DEFAULT_GOOGLE_SHEETS_SCRIPT_URL;

    let sheetSaved = false;

    // 1. If Google Apps Script URL is configured, push to Google Sheets
    if (googleSheetScriptUrl) {
      try {
        const sheetRes = await fetch(googleSheetScriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          redirect: "follow",
        });

        if (sheetRes.ok) {
          sheetSaved = true;
        }
      } catch (sheetErr) {
        console.error("Error forwarding to Google Sheets script:", sheetErr);
      }
    }

    // 2. Backup notification via Web3Forms so no registration is ever lost
    const web3formsKey =
      process.env.WEB3FORMS_KEY || "2bfb4e6e-317b-4d34-b81e-ce44a86fae87";

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `⚡ New Hackathon Registration: ${teamName} (${fullName})`,
          from_name: "Calmstacks Hackathon Portal",
          message: `
NEW 24-HOUR HACKATHON REGISTRATION
-----------------------------------
Date & Time: ${payload.timestamp}
Team Name: ${teamName}
Team Size: ${teamSize}
Team Lead: ${fullName}
USN: ${usn}
Email: ${email}
Phone / WhatsApp: ${cleanPhone}
Year & Sem: ${yearSemester}
Track Preference: ${trackPreference}
Project Concept / Problem: ${projectIdea}
-----------------------------------
Venue: Central Library, Malnad College of Engineering
Dates: 25-26 September 2026 (Starts 2:00 PM)
          `,
        }),
      });
    } catch (mailErr) {
      console.error("Backup email dispatch error:", mailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Registration recorded successfully",
      sheetSaved,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}
