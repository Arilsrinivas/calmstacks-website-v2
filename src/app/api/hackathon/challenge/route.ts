import { NextResponse } from "next/server";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

// Shared in-process memory cache
let cachedState: {
  isRevealed: boolean;
  updatedAt: number;
  customStatement?: any;
} = {
  isRevealed: false,
  updatedAt: Date.now(),
};

const SYNC_TOPIC = "calmstacks_mce_hackathon_challenge_2026_v1";
const ADMIN_PASSCODES = ["calm2026", "calmstacks@admin", "calmstacks2026", "mce2026"];

// Helper to poll remote sync topic
async function fetchRemoteState(): Promise<boolean | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`https://ntfy.sh/${SYNC_TOPIC}/json?poll=1`, {
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const text = await res.text();
    const lines = text.trim().split("\n").filter(Boolean);
    if (lines.length === 0) return null;

    // Get latest message
    for (let i = lines.length - 1; i >= 0; i--) {
      try {
        const item = JSON.parse(lines[i]);
        if (item.message) {
          const parsed = JSON.parse(item.message);
          if (typeof parsed.isRevealed === "boolean") {
            return parsed.isRevealed;
          }
        }
      } catch {
        // continue
      }
    }
  } catch (err) {
    console.warn("Could not reach remote sync:", err);
  }
  return null;
}

// Helper to broadcast update to remote sync topic
async function broadcastRemoteState(state: { isRevealed: boolean; updatedAt: number; customStatement?: any }) {
  try {
    await fetch(`https://ntfy.sh/${SYNC_TOPIC}/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
      cache: "no-store",
    });
  } catch (err) {
    console.error("Failed to broadcast remote state:", err);
  }
}

export async function GET() {
  // Check if environment variable explicitly overrides (e.g. deployed with reveal on)
  if (process.env.NEXT_PUBLIC_PROBLEM_STATEMENT_REVEALED === "true") {
    return NextResponse.json({
      isRevealed: true,
      problemStatement: HACKATHON_CONFIG.challenge.problemStatement,
      updatedAt: cachedState.updatedAt,
    });
  }

  // Check remote sync if not yet marked revealed locally
  if (!cachedState.isRevealed) {
    const remoteRevealed = await fetchRemoteState();
    if (remoteRevealed !== null) {
      cachedState.isRevealed = remoteRevealed;
    }
  }

  return NextResponse.json(
    {
      isRevealed: cachedState.isRevealed,
      problemStatement: cachedState.isRevealed
        ? cachedState.customStatement || HACKATHON_CONFIG.challenge.problemStatement
        : null,
      updatedAt: cachedState.updatedAt,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode, isRevealed, customStatement } = body;

    // Verify passcode
    const cleanPass = (passcode || "").toString().trim();
    if (!ADMIN_PASSCODES.includes(cleanPass)) {
      return NextResponse.json(
        { error: "Unauthorized: Incorrect admin passcode." },
        { status: 401 }
      );
    }

    if (typeof isRevealed !== "boolean") {
      return NextResponse.json(
        { error: "Invalid payload: 'isRevealed' boolean required." },
        { status: 400 }
      );
    }

    cachedState = {
      isRevealed,
      updatedAt: Date.now(),
      customStatement: customStatement || cachedState.customStatement,
    };

    // Broadcast globally to all instances & clients
    await broadcastRemoteState(cachedState);

    const response = NextResponse.json({
      success: true,
      isRevealed: cachedState.isRevealed,
      updatedAt: cachedState.updatedAt,
      problemStatement: cachedState.isRevealed
        ? cachedState.customStatement || HACKATHON_CONFIG.challenge.problemStatement
        : null,
    });

    // Set cookie for quick local verification
    response.cookies.set("cs_challenge_revealed", isRevealed ? "true" : "false", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
