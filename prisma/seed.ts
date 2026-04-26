import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const projects = [
  {
    title: "NeuraBot Control Suite",
    category: "Robotics",
    description:
      "Real-time robotic arm control system with computer vision integration and predictive motion planning.",
    tech: JSON.stringify(["Python", "ROS2", "OpenCV", "TensorFlow"]),
    gradient: "from-violet-600 to-indigo-600",
    featured: true,
  },
  {
    title: "FinFlow Dashboard",
    category: "Web App",
    description:
      "Enterprise financial analytics platform with real-time data streaming and interactive visualizations.",
    tech: JSON.stringify(["Next.js", "TypeScript", "D3.js", "PostgreSQL"]),
    gradient: "from-blue-600 to-cyan-600",
    featured: true,
  },
  {
    title: "MediTrack Mobile",
    category: "Mobile App",
    description:
      "Patient health monitoring app with wearable device sync, AI diagnostics, and telehealth integration.",
    tech: JSON.stringify(["React Native", "Node.js", "MongoDB", "AWS"]),
    gradient: "from-emerald-600 to-teal-600",
    featured: true,
  },
];

async function main() {
  console.log("Seeding database...");
  await prisma.project.deleteMany();
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log(`Seeded ${projects.length} projects`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
