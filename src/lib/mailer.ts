import nodemailer from "nodemailer";
import { Registration } from "./db";

// Helper to create transport
function getMailTransport() {
  const host = process.env.SMTP_HOST || "";
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";

  // If no host is configured, return null to log and simulate success
  if (!host || !user) {
    console.warn("SMTP credentials are not configured in environment variables. Email sending will be logged to console instead.");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
}

export async function sendHackathonEmails(registration: Registration): Promise<boolean> {
  const transport = getMailTransport();
  const fromEmail = process.env.SMTP_FROM || '"CalmStacks Hackathon" <noreply@calmstacks.com>';
  
  // Create beautiful HTML for participant confirmation
  const participantHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg: 8px;">
      <h2 style="color: #2563eb; margin-bottom: 20px;">Registration Confirmed!</h2>
      <p>Hello <strong>${registration.full_name}</strong>,</p>
      <p>Your registration for the <strong>CalmStacks Internship Hackathon 2026</strong> has been successfully submitted and confirmed.</p>
      
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Registration ID:</strong> <span style="font-family: monospace; font-size: 14px; font-weight: bold;">${registration.id}</span></p>
        <p style="margin: 5px 0;"><strong>Team Name:</strong> ${registration.team_name}</p>
        <p style="margin: 5px 0;"><strong>Team Size:</strong> ${registration.team_size}</p>
        <p style="margin: 5px 0;"><strong>Payment Status:</strong> Confirmed (SUCCESS)</p>
        <p style="margin: 5px 0;"><strong>Payment ID:</strong> ${registration.payment_id || "N/A"}</p>
      </div>

      <h3 style="color: #1e293b; margin-top: 25px;">What's Next?</h3>
      <ol style="padding-left: 20px; line-height: 1.6;">
        <li>Join the official CalmStacks Hackathon Discord server (check your welcome channel for updates).</li>
        <li>Whitelist emails from <strong>@calmstacks.com</strong> so you don't miss credentials or timeline schedules.</li>
        <li>The hackathon kick-off guidelines and submission details will be emailed to all participants 24 hours before the event.</li>
      </ol>
      
      <p style="margin-top: 30px; font-size: 12px; color: #64748b;">This is an automated confirmation email from CalmStacks. Please do not reply directly to this mail.</p>
    </div>
  `;

  // Create detailed HTML for admin notification
  const adminHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #dc2626; margin-bottom: 20px; border-bottom: 2px solid #f1f5f9; pb-10px;">New Hackathon Registration</h2>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="background-color: #f8fafc;">
          <td style="padding: 8px; font-weight: bold; width: 180px;">Registration ID</td>
          <td style="padding: 8px; font-family: monospace;">${registration.id}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Registration Date</td>
          <td style="padding: 8px;">${new Date(registration.created_at).toLocaleString()}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 8px; font-weight: bold;">Team Name</td>
          <td style="padding: 8px;"><strong>${registration.team_name}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Team Size</td>
          <td style="padding: 8px;">${registration.team_size}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 8px; font-weight: bold;">Payment ID</td>
          <td style="padding: 8px; font-family: monospace;">${registration.payment_id || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Payment Status</td>
          <td style="padding: 8px; color: #16a34a; font-weight: bold;">${registration.payment_status}</td>
        </tr>
      </table>

      <h3 style="color: #1e293b; margin-top: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 5px;">Primary Participant Details</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr>
          <td style="padding: 6px 8px; font-weight: bold; width: 180px;">Full Name</td>
          <td style="padding: 6px 8px;">${registration.full_name}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 6px 8px; font-weight: bold;">Email</td>
          <td style="padding: 6px 8px;">${registration.email}</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px; font-weight: bold;">Phone</td>
          <td style="padding: 6px 8px;">${registration.phone}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 6px 8px; font-weight: bold;">College</td>
          <td style="padding: 6px 8px;">${registration.college}</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px; font-weight: bold;">Degree / Branch</td>
          <td style="padding: 6px 8px;">${registration.degree || "N/A"}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 6px 8px; font-weight: bold;">Year of Study</td>
          <td style="padding: 6px 8px;">${registration.year_of_study}</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px; font-weight: bold;">GitHub</td>
          <td style="padding: 6px 8px;">${registration.github ? `<a href="${registration.github}">${registration.github}</a>` : "N/A"}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 6px 8px; font-weight: bold;">LinkedIn</td>
          <td style="padding: 6px 8px;">${registration.linkedin ? `<a href="${registration.linkedin}">${registration.linkedin}</a>` : "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px; font-weight: bold; vertical-align: top;">Motivation</td>
          <td style="padding: 6px 8px; white-space: pre-wrap;">${registration.motivation}</td>
        </tr>
      </table>

      ${
        registration.team_members && registration.team_members.length > 0
          ? `
          <h3 style="color: #1e293b; margin-top: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 5px;">Additional Team Members</h3>
          ${registration.team_members
            .map(
              (m, idx) => `
            <div style="background-color: #f8fafc; padding: 10px; border-radius: 6px; margin-bottom: 10px; font-size: 12px;">
              <p style="margin: 3px 0;"><strong>Member ${idx + 2}:</strong> ${m.fullName}</p>
              <p style="margin: 3px 0;"><strong>Email:</strong> ${m.email}</p>
              <p style="margin: 3px 0;"><strong>Phone:</strong> ${m.phone}</p>
              <p style="margin: 3px 0;"><strong>College:</strong> ${m.college}</p>
            </div>
          `
            )
            .join("")}
        `
          : ""
      }
    </div>
  `;

  try {
    if (!transport) {
      // SMTP variables not configured, log details to console
      console.log("=== SIMULATED HACKATHON CONFIRMATION EMAIL ===");
      console.log(`TO: ${registration.email}`);
      console.log(`FROM: ${fromEmail}`);
      console.log(`SUBJECT: Registration Confirmed: CalmStacks Internship Hackathon 2026`);
      console.log(`REGISTRATION ID: ${registration.id}`);
      console.log("===============================================");
      
      console.log("=== SIMULATED ADMIN NOTIFICATION EMAIL ===");
      console.log(`TO: arilsrinivas8@gmail.com`);
      console.log(`FROM: ${fromEmail}`);
      console.log(`SUBJECT: [Hackathon Registration] ${registration.full_name}`);
      console.log(`TEAM SIZE: ${registration.team_size}`);
      console.log("===========================================");
      return true;
    }

    // 1. Send confirmation email to participant
    await transport.sendMail({
      from: fromEmail,
      to: registration.email,
      subject: "Registration Confirmed: CalmStacks Internship Hackathon 2026",
      html: participantHtml,
    });
    console.log(`Confirmation email sent successfully to ${registration.email}`);

    // 2. Send notification email to admin arilsrinivas8@gmail.com
    await transport.sendMail({
      from: fromEmail,
      to: "arilsrinivas8@gmail.com",
      subject: `[Hackathon Registration] ${registration.full_name}`,
      html: adminHtml,
    });
    console.log(`Admin notification email sent successfully to arilsrinivas8@gmail.com`);

    return true;
  } catch (error) {
    // Log the error but do not throw, satisfying the fallback requirement
    console.error("FAILED to send emails via SMTP transporter:", error);
    return false;
  }
}
