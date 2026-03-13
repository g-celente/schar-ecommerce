import { PrismaClient } from "@prisma/client";

/**
 * PrismaClient singleton — prevents creating multiple instances during
 * hot-module replacement in Next.js development.
 *
 * In dev, Next.js/Turbopack re-evaluates modules on every change.
 * Without this pattern, each reload would open a new DB connection pool,
 * quickly exhausting Postgres's connection limit.
 *
 * Pattern: store the client on `globalThis` in development so it survives
 * HMR cycles. In production, a new process always gets a fresh client.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
