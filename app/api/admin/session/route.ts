import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_EXPIRY_MS } from "@/lib/admin-session";

/** Exchanges a freshly-signed-in Firebase ID token for an HttpOnly session cookie. */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const idToken = body && typeof body === "object" ? (body as Record<string, unknown>).idToken : null;

  if (typeof idToken !== "string" || !idToken) {
    return NextResponse.json({ ok: false, error: "Missing sign-in token." }, { status: 400 });
  }

  try {
    // requireRecentLogin=true: reject stale or replayed ID tokens.
    await getAdminAuth().verifyIdToken(idToken, true);
    const sessionCookie = await getAdminAuth().createSessionCookie(idToken, {
      expiresIn: ADMIN_SESSION_EXPIRY_MS,
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_SESSION_EXPIRY_MS / 1000,
    });
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[admin-session] Failed to create session.", error);
    return NextResponse.json({ ok: false, error: "Sign-in failed." }, { status: 401 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
