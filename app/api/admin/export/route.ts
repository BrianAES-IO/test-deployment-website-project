import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { requireAdminSession } from "@/lib/admin-session";

function csvEscape(value: string) {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

const headers = [
  "Date",
  "Type",
  "Name",
  "Company",
  "Role",
  "Sector",
  "Company size",
  "Email",
  "Phone",
  "Score",
  "Max score",
  "Band",
  "Follow-up consent",
  "Status",
  "Notes",
];

export async function GET(request: NextRequest) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");

  const snapshot = await getAdminDb().collection("assessmentSubmissions").orderBy("submittedAt", "desc").get();

  const rows = snapshot.docs
    .map((doc) => doc.data())
    .filter((data) => (type ? data.type === type : true))
    .filter((data) => (status ? data.status === status : true))
    .map((data) => {
      const submittedAt = data.submittedAt?.toDate ? data.submittedAt.toDate().toISOString() : "";
      const contact = data.contact ?? {};
      return [
        submittedAt,
        data.type ?? "",
        contact.name ?? "",
        contact.company ?? "",
        contact.role ?? "",
        contact.sector ?? "",
        contact.companySize ?? "",
        contact.email ?? "",
        contact.phone ?? "",
        String(data.score ?? ""),
        String(data.maxScore ?? ""),
        data.band ?? "",
        data.consent ? "Yes" : "No",
        data.status ?? "",
        data.notes ?? "",
      ];
    });

  const csv = [headers, ...rows].map((row) => row.map((cell) => csvEscape(String(cell))).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="assessment-submissions.csv"',
    },
  });
}
