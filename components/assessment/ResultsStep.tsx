import Link from "next/link";
import { LedgerLabel } from "@/components/Ledger";
import { GaugeIcon } from "@/components/icons";
import type { AssessmentType } from "@/config/assessments";

const serviceLink: Record<AssessmentType, { href: string; label: string }> = {
  dpa: { href: "/services/dpa-compliance", label: "See COMPLY" },
  security: { href: "/services/security-assessments", label: "See the registered Security Assessment" },
};

export function ResultsStep({
  type,
  result,
}: {
  type: AssessmentType;
  result: { score: number; maxScore: number; band: { label: string; summary: string } };
}) {
  const service = serviceLink[type];

  return (
    <div className="mt-10">
      <span className="mb-6 flex h-12 w-12 items-center justify-center border border-line bg-surface">
        <GaugeIcon className="h-6 w-6 text-brand" />
      </span>
      <LedgerLabel>Your result</LedgerLabel>
      <h2 className="mt-3 text-3xl font-medium text-ink sm:text-4xl">{result.band.label}</h2>
      <p className="mt-2 font-mono text-sm text-ink-muted">
        {result.score} / {result.maxScore} points
      </p>
      <p className="mt-6 max-w-xl text-base text-ink-muted">{result.band.summary}</p>

      <div className="mt-6 max-w-xl border border-line bg-white/60 p-6 text-sm text-ink-muted">
        This result is indicative and self-reported: it reflects the answers you gave, not an
        independent review of your organization. It isn&apos;t legal advice, and it isn&apos;t a
        defensible compliance record. A registered assessment, delivered by AESURUS, is what
        produces that.
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href="/book"
          className="inline-block rounded-sm bg-brand px-8 py-4 font-body text-base font-semibold text-paper transition-colors duration-200 ease-brand hover:bg-brand-deep"
        >
          Book a 15-minute exposure check
        </Link>
        <Link href={service.href} className="link-underline text-sm font-semibold text-brand">
          {service.label} &rarr;
        </Link>
      </div>
    </div>
  );
}
