import fs from "fs";
import path from "path";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url";
  required: boolean;
}

export interface HackathonConfig {
  id: string;
  name: string;
  registrationFee: number; // fee per participant in INR
  active: boolean;
  fields: FieldConfig[];
}

export interface TeamMember {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  degree?: string;
  github?: string;
  linkedin?: string;
  [key: string]: any; // supports dynamic/additional participant fields
}

export interface Registration {
  id: string; // unique registration / team id
  hackathonId: string;
  teamSize: number;
  members: TeamMember[];
  cashfreeOrderId: string;
  cashfreePaymentId?: string;
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED";
  paymentAmount: number;
  registeredAt: string;
}

interface DatabaseSchema {
  hackathons: HackathonConfig[];
  registrations: Registration[];
}

const DB_FILE_PATH = path.join(process.cwd(), "data", "db.json");

const DEFAULT_HACKATHON: HackathonConfig = {
  id: "calmstacks-internship-hackathon-2026",
  name: "CalmStacks Internship Hackathon 2026",
  registrationFee: 100,
  active: true,
  fields: [
    { name: "fullName", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "college", label: "College/University", type: "text", required: true },
    { name: "degree", label: "Degree/Branch", type: "text", required: false },
    { name: "github", label: "GitHub Profile", type: "url", required: false },
    { name: "linkedin", label: "LinkedIn Profile", type: "url", required: false },
  ],
};

function ensureDatabase() {
  const dirPath = path.dirname(DB_FILE_PATH);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE_PATH)) {
    const initialDb: DatabaseSchema = {
      hackathons: [DEFAULT_HACKATHON],
      registrations: [],
    };
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initialDb, null, 2), "utf-8");
  }
}

export function readDb(): DatabaseSchema {
  ensureDatabase();
  try {
    const data = fs.readFileSync(DB_FILE_PATH, "utf-8");
    return JSON.parse(data) as DatabaseSchema;
  } catch (error) {
    console.error("Error reading database file, returning empty schema:", error);
    return { hackathons: [DEFAULT_HACKATHON], registrations: [] };
  }
}

export function writeDb(db: DatabaseSchema) {
  ensureDatabase();
  const tempPath = `${DB_FILE_PATH}.tmp`;
  try {
    fs.writeFileSync(tempPath, JSON.stringify(db, null, 2), "utf-8");
    fs.renameSync(tempPath, DB_FILE_PATH);
  } catch (error) {
    console.error("Error writing to database:", error);
    if (fs.existsSync(tempPath)) {
      try {
        fs.unlinkSync(tempPath);
      } catch (err) {
        // ignore
      }
    }
    throw new Error("Failed to write to database");
  }
}

// Helpers for Hackathons
export function getHackathons(): HackathonConfig[] {
  const db = readDb();
  return db.hackathons;
}

export function getActiveHackathon(): HackathonConfig {
  const db = readDb();
  const active = db.hackathons.find((h) => h.active);
  if (!active) {
    // fallback or auto-activate the default one
    return DEFAULT_HACKATHON;
  }
  return active;
}

export function saveHackathon(hackathon: HackathonConfig) {
  const db = readDb();
  const index = db.hackathons.findIndex((h) => h.id === hackathon.id);
  if (index !== -1) {
    db.hackathons[index] = hackathon;
  } else {
    db.hackathons.push(hackathon);
  }
  writeDb(db);
}

// Helpers for Registrations
export function getRegistrations(): Registration[] {
  const db = readDb();
  return db.registrations;
}

export function getRegistrationByOrderId(orderId: string): Registration | undefined {
  const db = readDb();
  return db.registrations.find((r) => r.cashfreeOrderId === orderId);
}

export function addRegistration(reg: Registration) {
  const db = readDb();
  db.registrations.push(reg);
  writeDb(db);
}

export function updateRegistrationStatus(orderId: string, status: "SUCCESS" | "FAILED", paymentId?: string) {
  const db = readDb();
  const index = db.registrations.findIndex((r) => r.cashfreeOrderId === orderId);
  if (index !== -1) {
    db.registrations[index].paymentStatus = status;
    if (paymentId) {
      db.registrations[index].cashfreePaymentId = paymentId;
    }
    writeDb(db);
    return db.registrations[index];
  }
  return undefined;
}
