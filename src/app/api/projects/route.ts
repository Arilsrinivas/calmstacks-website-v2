import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
    });

    // Parse the tech JSON string back to arrays
    const parsed = projects.map((p) => ({
      ...p,
      tech: JSON.parse(p.tech) as string[],
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Projects fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
