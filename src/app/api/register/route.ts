import { NextResponse } from "next/server";
import { getActiveHackathon, addRegistration, getRegistrations, Registration, AdditionalTeamMember } from "@/lib/db";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { sendAdminNotification } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const college = formData.get("college") as string;
    const degree = formData.get("degree") as string;
    const year_of_study = formData.get("year_of_study") as string;
    const team_name = formData.get("team_name") as string;
    const team_size_str = formData.get("team_size") as string;
    const github = formData.get("github") as string || "";
    const linkedin = formData.get("linkedin") as string || "";
    const motivation = formData.get("motivation") as string;
    const hackathonId = formData.get("hackathonId") as string;
    const team_members_str = formData.get("team_members") as string || "[]";
    const screenshot = formData.get("screenshot") as Blob | null;

    // 1. Validation
    const size = Number(team_size_str);
    if (!size || size < 1 || size > 4) {
      return NextResponse.json({ error: "Invalid team size. Must be between 1 and 4." }, { status: 400 });
    }

    if (!fullName || !email || !phone || !college || !degree || !year_of_study || !team_name || !motivation) {
      return NextResponse.json({ error: "Missing required registration fields." }, { status: 400 });
    }

    if (!screenshot) {
      return NextResponse.json({ error: "Payment verification screenshot file is required." }, { status: 400 });
    }

    let teamMembers: AdditionalTeamMember[] = [];
    try {
      teamMembers = JSON.parse(team_members_str);
    } catch (e) {
      return NextResponse.json({ error: "Invalid team members details." }, { status: 400 });
    }

    if (size > 1 && teamMembers.length !== size - 1) {
      return NextResponse.json(
        { error: `You must specify details for all ${size - 1} additional team member(s).` },
        { status: 400 }
      );
    }

    // Validate additional team members
    for (let i = 0; i < teamMembers.length; i++) {
      const m = teamMembers[i];
      if (!m.fullName || !m.email || !m.phone || !m.college) {
        return NextResponse.json(
          { error: `Missing required details for Team Member ${i + 2}.` },
          { status: 400 }
        );
      }
    }

    const activeHackathon = await getActiveHackathon();
    if (activeHackathon.id !== hackathonId) {
      return NextResponse.json({ error: "Invalid hackathon identifier." }, { status: 400 });
    }

    // 2. Prevent duplicate registrations using email address
    const dbRegistrations = await getRegistrations();
    const successfulRegistrations = dbRegistrations.filter(
      (r) => r.hackathonId === hackathonId && r.payment_status === "SUCCESS"
    );

    const registeredEmails = new Set<string>();
    successfulRegistrations.forEach((r) => {
      registeredEmails.add(r.email.toLowerCase().trim());
      if (r.team_members && Array.isArray(r.team_members)) {
        r.team_members.forEach((m) => {
          registeredEmails.add(m.email.toLowerCase().trim());
        });
      }
    });

    if (registeredEmails.has(email.toLowerCase().trim())) {
      return NextResponse.json(
        { error: `Email address '${email}' is already registered.` },
        { status: 400 }
      );
    }

    for (const m of teamMembers) {
      if (registeredEmails.has(m.email.toLowerCase().trim())) {
        return NextResponse.json(
          { error: `Team member email address '${m.email}' is already registered.` },
          { status: 400 }
        );
      }
    }

    // 3. Process Screenshot File
    const registrationId = `CS-2026-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    const screenshotBytes = await screenshot.arrayBuffer();
    const screenshotBuffer = Buffer.from(screenshotBytes);

    // Get original file extension & base64 encoding
    let ext = "png";
    const originalName = (screenshot as any).name || "payment.png";
    const dotIdx = originalName.lastIndexOf(".");
    if (dotIdx !== -1) {
      ext = originalName.substring(dotIdx + 1);
    }

    const mimeType = ext === "pdf" ? "application/pdf" : `image/${ext === "jpg" || ext === "jpeg" ? "jpeg" : "png"}`;
    const base64Data = screenshotBuffer.toString("base64");
    const screenshotBase64 = `data:${mimeType};base64,${base64Data}`;

    const screenshotFilename = `${registrationId}_payment_${Date.now()}.${ext}`;
    const uploadsDir = process.env.VERCEL
      ? path.join("/tmp", "uploads")
      : path.join(process.cwd(), "public", "uploads");

    try {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const screenshotFullPath = path.join(uploadsDir, screenshotFilename);
      fs.writeFileSync(screenshotFullPath, screenshotBuffer);
    } catch (fsErr) {
      console.warn("Failed to write screenshot to local filesystem:", fsErr);
    }
    
    // Save relative or tmp path in db
    const screenshotPath = process.env.VERCEL
      ? `/tmp/uploads/${screenshotFilename}`
      : `/uploads/${screenshotFilename}`;

    // 4. Save Registration to database
    const totalAmount = activeHackathon.registrationFee * size;

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
      github: github,
      linkedin: linkedin,
      motivation: motivation,
      payment_status: "PENDING_VERIFICATION",
      payment_id: "",
      team_members: teamMembers,
      screenshot_path: screenshotPath,
      screenshot_base64: screenshotBase64,
    };

    await addRegistration(newReg);

    // 5. Send Email Notification to Admin (Asynchronously with Attachment Buffer)
    // Satisfies: "If email sending fails: Save registration to database, Show success message, Log email error"
    sendAdminNotification(newReg, screenshotBuffer, screenshotFilename).then((success) => {
      if (!success) {
        console.error("Nodemailer failed to email admin arilsrinivas8@gmail.com, but registration was preserved.");
      } else {
        console.log("Admin notification email sent successfully with payment screenshot.");
      }
    });

    return NextResponse.json({
      success: true,
      registrationId: registrationId,
      status: "PENDING_VERIFICATION",
    });
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
