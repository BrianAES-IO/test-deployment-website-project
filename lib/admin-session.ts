import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase-admin";

export const ADMIN_SESSION_COOKIE = "admin_session";

/** Five days, matches the cookie's own maxAge set in the session route. */
export const ADMIN_SESSION_EXPIRY_MS = 5 * 24 * 60 * 60 * 1000;

/**
 * Verifies the admin session cookie against Firebase. Returns the decoded
 * claims if valid, or null if there's no cookie or it doesn't verify (with
 * revocation checked, so a logged-out session can't be replayed). Shared by
 * app/admin/layout.tsx (redirects to /admin/login on null) and every
 * /api/admin/* route (returns 401 on null).
 */
export async function requireAdminSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!sessionCookie) return null;

  try {
    return await getAdminAuth().verifySessionCookie(sessionCookie, true);
  } catch {
    return null;
  }
}
