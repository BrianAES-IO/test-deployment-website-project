import { NextRequest, NextResponse } from "next/server";

// TODO: this stub only logs submissions server-side. Before launch, wire this
// to a real destination, e.g. send an email via Resend/SendGrid, or create
// a record in whatever CRM (HubSpot, Airtable, etc.) tracks Briefing
// registrations. Do not ship to production without that wiring: submissions
// currently go nowhere but the server log.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const { name, firm, role, email, phone } = body as Record<string, unknown>;

  if (!name || !firm || !role || !email) {
    return NextResponse.json(
      { ok: false, error: "Name, firm, role, and email are required." },
      { status: 400 }
    );
  }

  // eslint-disable-next-line no-console
  console.log("[briefing-registration] TODO: forward this to email/CRM, not just the log.", {
    name,
    firm,
    role,
    email,
    phone,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
