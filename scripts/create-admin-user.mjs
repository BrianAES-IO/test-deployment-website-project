#!/usr/bin/env node
/**
 * One-off CLI helper to create (or reset the password of) the single
 * admin account for /admin. There's no public sign-up UI on purpose; this
 * script is the only way to provision that account.
 *
 * Usage: node scripts/create-admin-user.mjs you@aesurus.io <password>
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const __dirname = dirname(fileURLToPath(import.meta.url));

// .env.local isn't auto-loaded outside Next.js; read it manually so this
// script sees the same FIREBASE_ADMIN_* vars the app uses.
function loadEnvLocal() {
  const envPath = join(__dirname, "..", ".env.local");
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    const isQuoted =
      (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"));
    if (isQuoted) value = value.slice(1, -1);

    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const [, , email, password] = process.argv;

if (!email || !password) {
  console.error("Usage: node scripts/create-admin-user.mjs <email> <password>");
  process.exit(1);
}

if (password.length < 8) {
  console.error("Password must be at least 8 characters (Firebase Auth's own minimum).");
  process.exit(1);
}

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error(
    "Missing FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, or FIREBASE_ADMIN_PRIVATE_KEY.\n" +
      "Set these in .env.local first (see .env.example)."
  );
  process.exit(1);
}

initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });

try {
  const auth = getAuth();
  const existing = await auth.getUserByEmail(email).catch(() => null);

  if (existing) {
    await auth.updateUser(existing.uid, { password });
    console.log(`Updated password for existing admin user: ${email}`);
  } else {
    const user = await auth.createUser({ email, password });
    console.log(`Created admin user: ${user.email} (${user.uid})`);
  }
} catch (error) {
  console.error("Failed to create/update admin user:", error instanceof Error ? error.message : error);
  process.exit(1);
}
