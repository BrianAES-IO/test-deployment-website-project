import { notFound } from "next/navigation";
import Link from "next/link";
import { LedgerLabel, Ledger, LedgerRow } from "@/components/Ledger";
import { getAdminDb } from "@/lib/firebase-admin";
import { questionsFor, type AssessmentType } from "@/config/assessments";
import { SubmissionActions } from "@/components/admin/SubmissionActions";

export const dynamic = "force-dynamic";

export const metadata = { title: "Submission", robots: { index: false, follow: false } };

function Field({ label, value, href }: { label: string; value?: string; href?: string }) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">{label}</dt>
      <dd className="mt-0.5 text-ink">
        {href ? (
          <a href={href} className="link-underline text-brand">
            {value}
          </a>
        ) : (
          value || "-"
        )}
      </dd>
    </div>
  );
}

export default async function SubmissionDetailPage({ params }: { params: { id: string } }) {
  const doc = await getAdminDb().collection("assessmentSubmissions").doc(params.id).get();
  if (!doc.exists) notFound();

  const data = doc.data()!;
  const type = data.type as AssessmentType;
  const questions = questionsFor(type);
  const answers = (data.answers ?? {}) as Record<string, number>;
  const contact = data.contact ?? {};
  const submittedAt = data.submittedAt?.toDate ? data.submittedAt.toDate() : null;

  return (
    <div>
      <Link
        href="/admin"
        className="text-sm font-semibold text-ink-muted transition-colors duration-200 ease-brand hover:text-brand"
      >
        &larr; All submissions
      </Link>

      <div className="mt-6">
        <LedgerLabel>{type === "dpa" ? "DPA Exposure Score" : "Cyber Readiness Check"}</LedgerLabel>
        <h1 className="mt-2 text-2xl font-medium text-ink">{contact.company}</h1>
        <p className="mt-1 text-sm text-ink-muted">
          {data.score}/{data.maxScore} points &middot; {submittedAt ? submittedAt.toLocaleString() : "Unknown date"}
        </p>
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_260px]">
        <div>
          <LedgerLabel>Answers</LedgerLabel>
          <Ledger className="mt-4">
            {questions.map((question, i) => {
              const value = answers[question.id];
              const option = question.options.find((o) => o.value === value);
              return (
                <LedgerRow key={question.id} index={i + 1}>
                  <p className="text-sm text-ink">{question.prompt}</p>
                  <p className="mt-1 text-sm font-semibold text-brand">{option?.label ?? "No answer"}</p>
                </LedgerRow>
              );
            })}
          </Ledger>
        </div>

        <div>
          <LedgerLabel>Contact</LedgerLabel>
          <dl className="mt-4 space-y-3 text-sm">
            <Field label="Name" value={contact.name} />
            <Field label="Company" value={contact.company} />
            <Field label="Role" value={contact.role} />
            <Field label="Sector" value={contact.sector} />
            <Field label="Company size" value={contact.companySize} />
            <Field label="Email" value={contact.email} href={contact.email ? `mailto:${contact.email}` : undefined} />
            <Field label="Phone" value={contact.phone || "-"} />
            <Field label="Follow-up consent" value={data.consent ? "Yes" : "No"} />
          </dl>

          <div className="mt-8">
            <SubmissionActions id={params.id} status={data.status ?? "new"} notes={data.notes ?? ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
