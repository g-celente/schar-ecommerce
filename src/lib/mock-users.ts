/**
 * In-memory user store — for development/demo purposes only.
 * In production, replace this with a real database (Prisma, Drizzle, etc.)
 */
import bcrypt from "bcryptjs";

export interface MockUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
}

// Pre-seeded demo user (password: "password123")
const DEMO_HASH = bcrypt.hashSync("password123", 10);

const users = new Map<string, MockUser>([
  [
    "demo@schar.com",
    {
      id: "usr_demo",
      email: "demo@schar.com",
      name: "Demo User",
      passwordHash: DEMO_HASH,
    },
  ],
]);

export function getUserByEmail(email: string): MockUser | undefined {
  return users.get(email.toLowerCase());
}

export async function verifyPassword(
  plaintext: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}

export async function createUser(
  email: string,
  name: string,
  password: string
): Promise<MockUser> {
  const normalizedEmail = email.toLowerCase();
  if (users.has(normalizedEmail)) {
    throw new Error("Email already registered");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user: MockUser = {
    id: `usr_${Date.now()}`,
    email: normalizedEmail,
    name,
    passwordHash,
  };
  users.set(normalizedEmail, user);
  return user;
}
