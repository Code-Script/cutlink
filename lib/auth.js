import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { cookies } from "next/headers";
import clientPromise from "@/lib/mongodb";

const scrypt = promisify(scryptCallback);
const SESSION_COOKIE = "cutlink_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = await scrypt(password, salt, 64);
  return `${salt}:${Buffer.from(hash).toString("hex")}`;
}

export async function verifyPassword(password, storedPassword) {
  const [salt, storedHash] = storedPassword.split(":");
  const hash = await scrypt(password, salt, 64);
  return timingSafeEqual(Buffer.from(storedHash, "hex"), Buffer.from(hash));
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const client = await clientPromise;
  const db = client.db("cutlink");
  const session = await db.collection("sessions").findOne({ token, expiresAt: { $gt: new Date() } });
  if (!session) return null;

  return db.collection("users").findOne(
    { _id: session.userId },
    { projection: { passwordHash: 0 } },
  );
}

export async function createSession(userId) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);
  const client = await clientPromise;
  await client.db("cutlink").collection("sessions").insertOne({ userId, token, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    const client = await clientPromise;
    await client.db("cutlink").collection("sessions").deleteOne({ token });
  }
  cookieStore.delete(SESSION_COOKIE);
}

export function publicUser(user) {
  return user ? { id: user._id.toString(), email: user.email } : null;
}
