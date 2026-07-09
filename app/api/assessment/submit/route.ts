import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { scoreAssessment, type AssessmentContact, type AssessmentType } from "@/config/assessments";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validateContact(contact: unknown): contact is AssessmentContact {
  if (!contact || typeof contact !== "object") return false;
  const c = contact as Record<string, unknown>;
  return (
    isNonEmptyString(c.name) &&
    isNonEmptyString(c.company) &&
    isNonEmptyString(c.role) &&
    isNonEmptyString(c.sector) &&
    isNonEmptyString(c.companySize) &&
    isNonEmptyString(c.email) &&
    EMAIL_PATTERN.test(c.email) &&
    typeof c.phone === "string"
  );
}

// TODO: this route only writes to Firestore; before launch, also send the
// visitor their result by email (Resend/SendGrid) instead of relying on the
// admin manually following up. Matches the same "wire this later" pattern
// already flagged on /api/register.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const { type, answers, contact, consent, honeypot } = body as Record<string, unknown>;

  if (type !== "dpa" && type !== "security") {
    return NextResponse.json({ ok: false, error: "Invalid assessment type." }, { status: 400 });
  }

  if (typeof honeypot === "string" && honeypot.length > 0) {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  if (!answers || typeof answers !== "object") {
    return NextResponse.json({ ok: false, error: "Missing answers." }, { status: 400 });
  }

  if (!validateContact(contact)) {
    return NextResponse.json({ ok: false, error: "Please fill in all required fields." }, { status: 400 });
  }

  if (typeof consent !== "boolean") {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  let scored;
  try {
    scored = scoreAssessment(type as AssessmentType, answers as Record<string, number>);
  } catch {
    return NextResponse.json({ ok: false, error: "Please answer every question." }, { status: 400 });
  }

  try {
    await getAdminDb()
      .collection("assessmentSubmissions")
      .add({
        type,
        answers,
        score: scored.score,
        maxScore: scored.maxScore,
        band: scored.band.key,
        contact,
        consent,
        status: "new",
        notes: "",
        submittedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[assessment-submission] Failed to write to Firestore.", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong saving your result. Please try again." },
      { status: 500 }
    );
  }

  // eslint-disable-next-line no-console
  console.log("[assessment-submission] TODO: also email the visitor their result, not just store it.", {
    type,
    company: (contact as AssessmentContact).company,
    score: scored.score,
    band: scored.band.key,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    score: scored.score,
    maxScore: scored.maxScore,
    band: { label: scored.band.label, summary: scored.band.summary },
  });
}
