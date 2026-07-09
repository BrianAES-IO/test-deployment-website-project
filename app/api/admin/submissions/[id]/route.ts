import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { requireAdminSession } from "@/lib/admin-session";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { status, notes } = body as Record<string, unknown>;
  const update: Record<string, unknown> = { updatedAt: FieldValue.serverTimestamp() };

  if (status !== undefined) {
    if (status !== "new" && status !== "contacted") {
      return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });
    }
    update.status = status;
  }

  if (notes !== undefined) {
    if (typeof notes !== "string") {
      return NextResponse.json({ ok: false, error: "Invalid notes." }, { status: 400 });
    }
    update.notes = notes;
  }

  try {
    await getAdminDb().collection("assessmentSubmissions").doc(params.id).update(update);
    return NextResponse.json({ ok: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[admin-submissions] Failed to update.", error);
    return NextResponse.json({ ok: false, error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });

  try {
    await getAdminDb().collection("assessmentSubmissions").doc(params.id).delete();
    return NextResponse.json({ ok: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[admin-submissions] Failed to delete.", error);
    return NextResponse.json({ ok: false, error: "Delete failed." }, { status: 500 });
  }
}
