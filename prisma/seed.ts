/**
 * Prisma seed — run with: npx prisma db seed
 * Seeds a demo user so the app works out of the box.
 *
 * Demo credentials:
 *   email:    demo@schar.com
 *   password: password123
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const demoEmail = "demo@schar.com";

  const existing = await prisma.user.findUnique({
    where: { email: demoEmail },
  });

  if (existing) {
    console.log("✓ Demo user already exists — skipping seed.");
    return;
  }

  const passwordHash = await bcrypt.hash("password123", 12);

  await prisma.user.create({
    data: {
      email: demoEmail,
      name: "Demo User",
      password: passwordHash,
    },
  });

  console.log("✓ Demo user created: demo@schar.com / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
