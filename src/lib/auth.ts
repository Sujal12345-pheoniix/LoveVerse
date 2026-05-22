import crypto from "crypto";
import { cookies } from "next/headers";
import { db, User } from "./db";

const AUTH_COOKIE_NAME = "loveverse_session";
const JWT_SECRET = process.env.JWT_SECRET || "loveverse-extremely-secret-key-321-789";
const SALT = "loveverse-salt";

// Simple SHA-256 password hashing
export function hashPassword(password: string): string {
  return crypto
    .createHmac("sha256", SALT)
    .update(password)
    .digest("hex");
}

// Simple base64 encode/decode
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

interface SessionPayload {
  userId?: string;
  exp?: number;
  [key: string]: unknown;
}
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString("utf8");
}

// Custom JWT sign helper (zero dependency)
export function signSessionToken(payload: object): string {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const data = base64UrlEncode(JSON.stringify({ ...payload, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })); // 7 days expiration
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${header}.${data}`)
    .digest("base64url");
  return `${header}.${data}.${signature}`;
}

// Custom JWT verify helper
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const [header, data, signature] = token.split(".");
    if (!header || !data || !signature) return null;

    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${header}.${data}`)
      .digest("base64url");

    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(base64UrlDecode(data)) as SessionPayload;
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

// Retrieve currently authenticated user (server side only)
export async function getSessionUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifySessionToken(token);
    if (!payload || !payload.userId) return null;

    return await db.users.findById(payload.userId);
  } catch {
    return null;
  }
}

// Login action helper
export async function setSession(userId: string) {
  const token = signSessionToken({ userId });
  const cookieStore = await cookies();
  cookieStore.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

// Logout action helper
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
