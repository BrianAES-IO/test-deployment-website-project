import Link from "next/link";
import { LedgerLabel } from "@/components/Ledger";
import { getAdminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export const metadata = { title: "Submissions", robots: { index: false, follow: false } };

type SubmissionRow = {
  id: string;
  type: string;
  company: string;
  name: string;
  score: number;
  maxScore: number;
  band: string;
  status: string;
  submittedAt: string | null;
};

const bandLabels: Record<string, string> = {
  higher: "Higher exposure",
  moderate: "Moderate exposure",
  lower: "Lower exposure",
};

const typeLabels: Record<string, string> = { dpa: "DPA", security: "Security" };

// Filtering happens in memory after a single orderBy(submittedAt) fetch, not
// via Firestore where()+orderBy() on different fields, which would need a
// composite index. Fine at this tool's expected volume; revisit if this
// collection ever grows into the tens of thousands of documents.
async function getSubmissions(filters: { type?: string; status?: string }): Promise<SubmissionRow[]> {
  const snapshot = await getAdminDb().collection("assessmentSubmissions").orderBy("submittedAt", "desc").get();

  return snapshot.docs
    .map((doc) => {
      const data = doc.data();
      const submittedAt = data.submittedAt?.toDate ? data.submittedAt.toDate().toISOString() : null;
      return {
        id: doc.id,
        type: data.type,
        company: data.contact?.company ?? "",
        name: data.contact?.name ?? "",
        score: data.score,
        maxScore: data.maxScore,
        band: data.band,
        status: data.status ?? "new",
        submittedAt,
      };
    })
    .filter((row) => (filters.type ? row.type === filters.type : true))
    .filter((row) => (filters.status ? row.status === filters.status : true));
}

function buildQuery(params: Record<string, string | undefined>) {
  const search = new URLSearchParams();
  if (params.type) search.set("type", params.type);
  if (params.status) search.set("status", params.status);
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

function FilterLink({ label, active, href }: { label: string; active: boolean; href: string }) {
  return (
    <Link
      href={`/admin${href}`}
      className={`transition-colors duration-200 ease-brand ${
        active ? "font-semibold text-brand" : "text-ink-muted hover:text-brand"
      }`}
    >
      {label}
    </Link>
  );
}

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const type = typeof searchParams.type === "string" ? searchParams.type : undefined;
  const status = typeof searchParams.status === "string" ? searchParams.status : undefined;
  const submissions = await getSubmissions({ type, status });
  const exportHref = `/api/admin/export${buildQuery({ type, status })}`;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <LedgerLabel>Submissions</LedgerLabel>
          <h1 className="mt-2 text-2xl font-medium text-ink">
            {submissions.length} result{submissions.length === 1 ? "" : "s"}
          </h1>
        </div>
        <a href={exportHref} className="link-underline text-sm font-semibold text-brand">
          Export CSV &darr;
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <FilterLink label="All types" active={!type} href={buildQuery({ status })} />
        <FilterLink label="DPA" active={type === "dpa"} href={buildQuery({ type: "dpa", status })} />
        <FilterLink label="Security" active={type === "security"} href={buildQuery({ type: "security", status })} />
        <span className="text-line">|</span>
        <FilterLink label="All statuses" active={!status} href={buildQuery({ type })} />
        <FilterLink label="New" active={status === "new"} href={buildQuery({ type, status: "new" })} />
        <FilterLink label="Contacted" active={status === "contacted"} href={buildQuery({ type, status: "contacted" })} />
      </div>

      <div className="mt-8 border-b border-line">
        {submissions.length === 0 && <p className="border-t border-line py-6 text-base text-ink-muted">No submissions yet.</p>}
        {submissions.map((s) => (
          <Link
            key={s.id}
            href={`/admin/${s.id}`}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line py-4 text-sm transition-colors duration-200 ease-brand hover:bg-surface"
          >
            <span className="w-24 font-mono text-ink-muted">
              {s.submittedAt ? new Date(s.submittedAt).toLocaleDateString() : "-"}
            </span>
            <span className="w-20 font-mono uppercase text-brand">{typeLabels[s.type] ?? s.type}</span>
            <span className="flex-1 font-medium text-ink">{s.company}</span>
            <span className="text-ink-muted">{s.name}</span>
            <span className="font-mono text-ink">
              {s.score}/{s.maxScore}
            </span>
            <span className="text-ink-muted">{bandLabels[s.band] ?? s.band}</span>
            <span
              className={`px-2 py-1 text-xs font-semibold uppercase ${
                s.status === "contacted" ? "bg-surface text-ink-muted" : "bg-brand text-paper"
              }`}
            >
              {s.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
