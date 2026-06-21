import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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
