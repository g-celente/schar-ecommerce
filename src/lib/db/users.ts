/**
 * User data-access layer.
 * All user operations go through here — keeps auth.ts and API routes thin.
 */
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import type { User } from "@prisma/client";

const BCRYPT_ROUNDS = 12;

// ─── Queries ─────────────────────────────────────────────────────────────────

export async function getUserByEmail(
  email: string
): Promise<User | null> {
  return db.user.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export async function getUserById(id: string): Promise<User | null> {
  return db.user.findUnique({ where: { id } });
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export async function createUser(
  email: string,
  name: string,
  password: string
): Promise<User> {
  const normalizedEmail = email.toLowerCase();

  const existing = await getUserByEmail(normalizedEmail);
  if (existing) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  return db.user.create({
    data: {
      email: normalizedEmail,
      name: name.trim(),
      password: passwordHash,
    },
  });
}

// ─── Auth helpers ─────────────────────────────────────────────────────────────

export async function verifyPassword(
  plaintext: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}
