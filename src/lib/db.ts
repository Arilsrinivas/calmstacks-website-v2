import fs from "fs";
import path from "path";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "textarea";
  required: boolean;
}

export interface HackathonConfig {
  id: string;
  name: string;
  registrationFee: number; // fee per participant in INR
  active: boolean;
  fields: FieldConfig[];
}

export interface AdditionalTeamMember {
  fullName: string;
  email: string;
  phone: string;
  college: string;
}

export interface Registration {
  id: string; // registration id
  hackathonId: string; // future-ready hackathon association
  created_at: string; // timestamp
  full_name: string;
  email: string;
  phone: string;
  college: string;
  degree?: string;
  year_of_study: string;
  team_name: string;
  team_size: number;
  github?: string;
  linkedin?: string;
  motivation: string;
  payment_id?: string; // payment verification transaction ID
  payment_status: "PENDING_VERIFICATION" | "SUCCESS" | "FAILED";
  team_members: AdditionalTeamMember[]; // JSON stored array of additional members
  screenshot_path: string; // path to the uploaded payment screenshot file
}

interface DatabaseSchema {
  hackathons: HackathonConfig[];
  registrations: Registration[];
}

// In serverless environments like Vercel, the local filesystem is read-only.
// We fall back to the writeable /tmp directory to prevent EROFS errors.
const DB_FILE_PATH = process.env.VERCEL
  ? path.join("/tmp", "db.json")
  : path.join(process.cwd(), "data", "db.json");

const DEFAULT_HACKATHON: HackathonConfig = {
  id: "calmstacks-internship-hackathon-2026",
  name: "CalmStacks Internship Hackathon 2026",
  registrationFee: 100,
  active: true,
  fields: [
    { name: "fullName", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "college", label: "College / University", type: "text", required: true },
    { name: "degree", label: "Degree / Branch", type: "text", required: true },
    { name: "year_of_study", label: "Year of Study", type: "text", required: true },
    { name: "team_name", label: "Team Name", type: "text", required: true },
    { name: "github", label: "GitHub Profile", type: "url", required: false },
    { name: "linkedin", label: "LinkedIn Profile", type: "url", required: false },
    { name: "motivation", label: "Why do you want to participate?", type: "textarea", required: true },
  ],
};

function ensureDatabase() {
  try {
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
  } catch (error) {
    console.error("Error in ensureDatabase:", error);
  }
}

export function readDb(): DatabaseSchema {
  try {
    ensureDatabase();
    if (fs.existsSync(DB_FILE_PATH)) {
      const data = fs.readFileSync(DB_FILE_PATH, "utf-8");
      return JSON.parse(data) as DatabaseSchema;
    }
  } catch (error) {
    console.error("Error reading database file, returning default schema:", error);
  }
  return { hackathons: [DEFAULT_HACKATHON], registrations: [] };
}

export function writeDb(db: DatabaseSchema) {
  try {
    ensureDatabase();
    const tempPath = `${DB_FILE_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(db, null, 2), "utf-8");
    fs.renameSync(tempPath, DB_FILE_PATH);
  } catch (error) {
    console.error("Error writing to database using temporary file, attempting direct write:", error);
    try {
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(db, null, 2), "utf-8");
    } catch (directError) {
      console.error("Critical: Direct database write failed as well:", directError);
    }
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

export function getRegistrationById(id: string): Registration | undefined {
  const db = readDb();
  return db.registrations.find((r) => r.id === id);
}

export function addRegistration(reg: Registration) {
  const db = readDb();
  db.registrations.push(reg);
  writeDb(db);
}

export function updateRegistrationStatus(id: string, status: "SUCCESS" | "FAILED", paymentId?: string) {
  const db = readDb();
  const index = db.registrations.findIndex((r) => r.id === id);
  if (index !== -1) {
    db.registrations[index].payment_status = status;
    if (paymentId) {
      db.registrations[index].payment_id = paymentId;
    }
    writeDb(db);
    return db.registrations[index];
  }
  return undefined;
}
