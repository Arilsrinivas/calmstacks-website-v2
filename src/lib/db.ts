import fs from "fs";
import path from "path";
import { kv } from "@vercel/kv";
import postgres from "postgres";

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
  screenshot_base64?: string; // base64 representation of the screenshot image
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

const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const isPostgresAvailable = !!DATABASE_URL;
const isKvAvailable = !isPostgresAvailable && !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

let sql: any = null;
if (isPostgresAvailable) {
  try {
    sql = postgres(DATABASE_URL!, {
      ssl: "require", // SSL required for Supabase/Neon
      connect_timeout: 10,
    });
  } catch (err) {
    console.error("Failed to initialize PostgreSQL client:", err);
  }
}

let tablesInitialized = false;

async function ensureTables() {
  if (!isPostgresAvailable || !sql || tablesInitialized) return;
  try {
    // Create hackathons table
    await sql`
      CREATE TABLE IF NOT EXISTS hackathons (
        id VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        registration_fee INT NOT NULL,
        active BOOLEAN NOT NULL,
        fields JSONB NOT NULL
      );
    `;
    
    // Create registrations table
    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id VARCHAR PRIMARY KEY,
        hackathon_id VARCHAR NOT NULL,
        created_at TIMESTAMPTZ NOT NULL,
        full_name VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        phone VARCHAR NOT NULL,
        college VARCHAR NOT NULL,
        degree VARCHAR,
        year_of_study VARCHAR NOT NULL,
        team_name VARCHAR NOT NULL,
        team_size INT NOT NULL,
        github VARCHAR,
        linkedin VARCHAR,
        motivation TEXT NOT NULL,
        payment_id VARCHAR,
        payment_status VARCHAR NOT NULL,
        team_members JSONB NOT NULL,
        screenshot_path VARCHAR NOT NULL,
        screenshot_base64 TEXT
      );
    `;

    // Seed default hackathon if database is empty
    const hackathons = await sql`SELECT id FROM hackathons LIMIT 1`;
    if (hackathons.length === 0) {
      await sql`
        INSERT INTO hackathons (id, name, registration_fee, active, fields)
        VALUES (
          ${DEFAULT_HACKATHON.id},
          ${DEFAULT_HACKATHON.name},
          ${DEFAULT_HACKATHON.registrationFee},
          ${DEFAULT_HACKATHON.active},
          ${JSON.stringify(DEFAULT_HACKATHON.fields)}
        )
      `;
    }
    tablesInitialized = true;
  } catch (error) {
    console.error("Error ensuring database tables exist:", error);
  }
}

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

export async function readDb(): Promise<DatabaseSchema> {
  if (isPostgresAvailable && sql) {
    try {
      await ensureTables();
      const hackathons = await sql`SELECT * FROM hackathons`;
      const registrations = await sql`SELECT * FROM registrations`;

      const mappedHackathons = hackathons.map((h: any) => ({
        id: h.id,
        name: h.name,
        registrationFee: Number(h.registration_fee),
        active: h.active,
        fields: typeof h.fields === "string" ? JSON.parse(h.fields) : h.fields,
      }));

      const mappedRegistrations = registrations.map((r: any) => ({
        id: r.id,
        hackathonId: r.hackathon_id,
        created_at: new Date(r.created_at).toISOString(),
        full_name: r.full_name,
        email: r.email,
        phone: r.phone,
        college: r.college,
        degree: r.degree || "",
        year_of_study: r.year_of_study,
        team_name: r.team_name,
        team_size: Number(r.team_size),
        github: r.github || "",
        linkedin: r.linkedin || "",
        motivation: r.motivation,
        payment_id: r.payment_id || "",
        payment_status: r.payment_status,
        team_members: typeof r.team_members === "string" ? JSON.parse(r.team_members) : r.team_members,
        screenshot_path: r.screenshot_path,
        screenshot_base64: r.screenshot_base64 || undefined,
      }));

      return { hackathons: mappedHackathons, registrations: mappedRegistrations };
    } catch (err) {
      console.error("Error querying PostgreSQL, falling back to local file:", err);
    }
  }

  if (isKvAvailable) {
    try {
      const data = await kv.get<DatabaseSchema>("calmstacks:db");
      if (data) {
        return data;
      }
      const initialDb: DatabaseSchema = {
        hackathons: [DEFAULT_HACKATHON],
        registrations: [],
      };
      await kv.set("calmstacks:db", initialDb);
      return initialDb;
    } catch (error) {
      console.error("Error reading from Vercel KV, falling back to local file:", error);
    }
  }

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

export async function writeDb(db: DatabaseSchema): Promise<void> {
  if (isPostgresAvailable && sql) {
    try {
      await ensureTables();
      // Overwrite/sync state (used for fallback or config changes)
      // Delete existing entries
      await sql`DELETE FROM hackathons`;
      await sql`DELETE FROM registrations`;

      // Batch insert hackathons
      for (const h of db.hackathons) {
        await sql`
          INSERT INTO hackathons (id, name, registration_fee, active, fields)
          VALUES (${h.id}, ${h.name}, ${h.registrationFee}, ${h.active}, ${JSON.stringify(h.fields)})
        `;
      }

      // Batch insert registrations
      for (const r of db.registrations) {
        await sql`
          INSERT INTO registrations (
            id, hackathon_id, created_at, full_name, email, phone, college, degree, 
            year_of_study, team_name, team_size, github, linkedin, motivation, 
            payment_id, payment_status, team_members, screenshot_path, screenshot_base64
          ) VALUES (
            ${r.id}, ${r.hackathonId}, ${new Date(r.created_at)}, ${r.full_name}, ${r.email}, ${r.phone}, ${r.college}, ${r.degree || null},
            ${r.year_of_study}, ${r.team_name}, ${r.team_size}, ${r.github || null}, ${r.linkedin || null}, ${r.motivation},
            ${r.payment_id || null}, ${r.payment_status}, ${JSON.stringify(r.team_members)}, ${r.screenshot_path}, ${r.screenshot_base64 || null}
          )
        `;
      }
      return;
    } catch (err) {
      console.error("Error writing to PostgreSQL, falling back to local file:", err);
    }
  }

  if (isKvAvailable) {
    try {
      await kv.set("calmstacks:db", db);
      return;
    } catch (error) {
      console.error("Error writing to Vercel KV, falling back to local file:", error);
    }
  }

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
export async function getHackathons(): Promise<HackathonConfig[]> {
  if (isPostgresAvailable && sql) {
    try {
      await ensureTables();
      const res = await sql`SELECT * FROM hackathons`;
      return res.map((h: any) => ({
        id: h.id,
        name: h.name,
        registrationFee: Number(h.registration_fee),
        active: h.active,
        fields: typeof h.fields === "string" ? JSON.parse(h.fields) : h.fields,
      }));
    } catch (err) {
      console.error("Error getting hackathons from PG:", err);
    }
  }
  const db = await readDb();
  return db.hackathons;
}

export async function getActiveHackathon(): Promise<HackathonConfig> {
  if (isPostgresAvailable && sql) {
    try {
      await ensureTables();
      const res = await sql`SELECT * FROM hackathons WHERE active = true LIMIT 1`;
      if (res.length > 0) {
        const h = res[0];
        return {
          id: h.id,
          name: h.name,
          registrationFee: Number(h.registration_fee),
          active: h.active,
          fields: typeof h.fields === "string" ? JSON.parse(h.fields) : h.fields,
        };
      }
      return DEFAULT_HACKATHON;
    } catch (err) {
      console.error("Error getting active hackathon from PG:", err);
    }
  }
  const db = await readDb();
  const active = db.hackathons.find((h) => h.active);
  if (!active) {
    return DEFAULT_HACKATHON;
  }
  return active;
}

export async function saveHackathon(hackathon: HackathonConfig): Promise<void> {
  if (isPostgresAvailable && sql) {
    try {
      await ensureTables();
      if (hackathon.active) {
        await sql`UPDATE hackathons SET active = false WHERE id != ${hackathon.id}`;
      }
      await sql`
        INSERT INTO hackathons (id, name, registration_fee, active, fields)
        VALUES (${hackathon.id}, ${hackathon.name}, ${hackathon.registrationFee}, ${hackathon.active}, ${JSON.stringify(hackathon.fields)})
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          registration_fee = EXCLUDED.registration_fee,
          active = EXCLUDED.active,
          fields = EXCLUDED.fields
      `;
      return;
    } catch (err) {
      console.error("Error saving hackathon to PG:", err);
    }
  }
  const db = await readDb();
  const index = db.hackathons.findIndex((h) => h.id === hackathon.id);
  if (index !== -1) {
    db.hackathons[index] = hackathon;
  } else {
    db.hackathons.push(hackathon);
  }
  await writeDb(db);
}

// Helpers for Registrations
export async function getRegistrations(): Promise<Registration[]> {
  if (isPostgresAvailable && sql) {
    try {
      await ensureTables();
      const res = await sql`SELECT * FROM registrations`;
      return res.map((r: any) => ({
        id: r.id,
        hackathonId: r.hackathon_id,
        created_at: new Date(r.created_at).toISOString(),
        full_name: r.full_name,
        email: r.email,
        phone: r.phone,
        college: r.college,
        degree: r.degree || "",
        year_of_study: r.year_of_study,
        team_name: r.team_name,
        team_size: Number(r.team_size),
        github: r.github || "",
        linkedin: r.linkedin || "",
        motivation: r.motivation,
        payment_id: r.payment_id || "",
        payment_status: r.payment_status,
        team_members: typeof r.team_members === "string" ? JSON.parse(r.team_members) : r.team_members,
        screenshot_path: r.screenshot_path,
        screenshot_base64: r.screenshot_base64 || undefined,
      }));
    } catch (err) {
      console.error("Error getting registrations from PG:", err);
    }
  }
  const db = await readDb();
  return db.registrations;
}

export async function getRegistrationById(id: string): Promise<Registration | undefined> {
  if (isPostgresAvailable && sql) {
    try {
      await ensureTables();
      const res = await sql`SELECT * FROM registrations WHERE id = ${id} LIMIT 1`;
      if (res.length > 0) {
        const r = res[0];
        return {
          id: r.id,
          hackathonId: r.hackathon_id,
          created_at: new Date(r.created_at).toISOString(),
          full_name: r.full_name,
          email: r.email,
          phone: r.phone,
          college: r.college,
          degree: r.degree || "",
          year_of_study: r.year_of_study,
          team_name: r.team_name,
          team_size: Number(r.team_size),
          github: r.github || "",
          linkedin: r.linkedin || "",
          motivation: r.motivation,
          payment_id: r.payment_id || "",
          payment_status: r.payment_status,
          team_members: typeof r.team_members === "string" ? JSON.parse(r.team_members) : r.team_members,
          screenshot_path: r.screenshot_path,
          screenshot_base64: r.screenshot_base64 || undefined,
        };
      }
      return undefined;
    } catch (err) {
      console.error("Error getting registration by id from PG:", err);
    }
  }
  const db = await readDb();
  return db.registrations.find((r) => r.id === id);
}

export async function addRegistration(reg: Registration): Promise<void> {
  if (isPostgresAvailable && sql) {
    try {
      await ensureTables();
      await sql`
        INSERT INTO registrations (
          id, hackathon_id, created_at, full_name, email, phone, college, degree, 
          year_of_study, team_name, team_size, github, linkedin, motivation, 
          payment_id, payment_status, team_members, screenshot_path, screenshot_base64
        ) VALUES (
          ${reg.id}, ${reg.hackathonId}, ${new Date(reg.created_at)}, ${reg.full_name}, ${reg.email}, ${reg.phone}, ${reg.college}, ${reg.degree || null},
          ${reg.year_of_study}, ${reg.team_name}, ${reg.team_size}, ${reg.github || null}, ${reg.linkedin || null}, ${reg.motivation},
          ${reg.payment_id || null}, ${reg.payment_status}, ${JSON.stringify(reg.team_members)}, ${reg.screenshot_path}, ${reg.screenshot_base64 || null}
        )
      `;
      return;
    } catch (err) {
      console.error("Error adding registration to PG:", err);
    }
  }
  const db = await readDb();
  db.registrations.push(reg);
  await writeDb(db);
}

export async function updateRegistrationStatus(id: string, status: "SUCCESS" | "FAILED", paymentId?: string): Promise<Registration | undefined> {
  if (isPostgresAvailable && sql) {
    try {
      await ensureTables();
      if (paymentId) {
        await sql`UPDATE registrations SET payment_status = ${status}, payment_id = ${paymentId} WHERE id = ${id}`;
      } else {
        await sql`UPDATE registrations SET payment_status = ${status} WHERE id = ${id}`;
      }
      return await getRegistrationById(id);
    } catch (err) {
      console.error("Error updating registration status in PG:", err);
    }
  }
  const db = await readDb();
  const index = db.registrations.findIndex((r) => r.id === id);
  if (index !== -1) {
    db.registrations[index].payment_status = status;
    if (paymentId) {
      db.registrations[index].payment_id = paymentId;
    }
    await writeDb(db);
    return db.registrations[index];
  }
  return undefined;
}
