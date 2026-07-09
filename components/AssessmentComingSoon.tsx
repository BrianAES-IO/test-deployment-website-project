import Link from "next/link";
import { LedgerLabel } from "@/components/Ledger";
import { GaugeIcon } from "@/components/icons";

export function AssessmentComingSoon({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-line bg-schematic">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <span className="mb-6 flex h-12 w-12 items-center justify-center border border-line bg-surface">
          <GaugeIcon className="h-6 w-6 text-brand" />
        </span>
        <LedgerLabel>{eyebrow}</LedgerLabel>
        <h1 className="mt-3 text-4xl font-medium text-ink sm:text-5xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-muted">{description}</p>

        <div className="mt-8 border border-line bg-white/60 p-8">
          <p className="text-base text-ink-muted">
            This free tool launches this month. In the meantime, book a 15-minute exposure check
            and we&apos;ll walk through the same questions with you directly.
          </p>
          <Link
            href="/book"
            className="mt-6 inline-block rounded-sm bg-brand px-8 py-4 font-body text-base font-semibold text-paper transition-colors duration-200 ease-brand hover:bg-brand-deep"
          >
            Book a 15-minute exposure check instead
          </Link>
        </div>
      </div>
    </section>
  );
}
