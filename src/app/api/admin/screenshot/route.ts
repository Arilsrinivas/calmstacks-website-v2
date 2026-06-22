import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getRegistrationById } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const passcode = searchParams.get("passcode");
    const filePath = searchParams.get("path");

    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    if (!passcode || passcode !== adminPassword) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!filePath) {
      return new Response("Path parameter is required", { status: 400 });
    }

    // Resolve directory safely to prevent path traversal
    const filename = path.basename(filePath);

    // 1. Try to load from database first (base64) to bypass ephemeral disk isolation on Vercel
    let registrationId = "";
    if (filename.startsWith("CS-2026-")) {
      const parts = filename.split("_");
      registrationId = parts[0];
    }

    if (registrationId) {
      const reg = await getRegistrationById(registrationId);
      if (reg && reg.screenshot_base64) {
        // Extract content type and base64 payload from data url
        const matches = reg.screenshot_base64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const contentType = matches[1];
          const base64Data = matches[2];
          const fileBuffer = Buffer.from(base64Data, "base64");
          return new Response(fileBuffer, {
            headers: {
              "Content-Type": contentType,
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        }
      }
    }

    // 2. Fallback to local filesystem if not in DB or no base64 string
    const uploadsDir = process.env.VERCEL
      ? path.join("/tmp", "uploads")
      : path.join(process.cwd(), "public", "uploads");
    const fullPath = path.join(uploadsDir, filename);

    if (!fs.existsSync(fullPath)) {
      console.error(`Screenshot file not found: ${fullPath}`);
      return new Response("File not found", { status: 404 });
    }

    // Determine content type based on extension
    let contentType = "image/png";
    const ext = path.extname(filename).toLowerCase();
    if (ext === ".jpg" || ext === ".jpeg") {
      contentType = "image/jpeg";
    } else if (ext === ".pdf") {
      contentType = "application/pdf";
    }

    const fileBuffer = fs.readFileSync(fullPath);
    return new Response(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Screenshot serve API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
