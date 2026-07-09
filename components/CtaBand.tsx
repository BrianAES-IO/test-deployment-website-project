import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function CtaBand({
  heading = "Book a 15-minute exposure check.",
  subhead = "No pitch. We tell you plainly whether the Act applies to you and what it would take to fix.",
  ctaLabel = "Book a 15-minute exposure check",
  assessmentHref = "/assessment/dpa",
  assessmentLabel = "Or check your exposure in 3 minutes, free",
  showAssessmentLink = true,
}: {
  heading?: string;
  subhead?: string;
  ctaLabel?: string;
  assessmentHref?: string;
  assessmentLabel?: string;
  showAssessmentLink?: boolean;
}) {
  return (
    <section className="border-t border-line bg-ink">
      <Reveal as="div" className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-3xl font-medium text-paper sm:text-4xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-paper/70">{subhead}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link
            href="/book"
            className="inline-block rounded-sm bg-brand px-8 py-4 font-body text-base font-semibold text-paper transition-colors duration-200 ease-brand hover:bg-brand-deep"
          >
            {ctaLabel}
          </Link>
          {showAssessmentLink && (
            <Link href={assessmentHref} className="link-underline text-sm font-medium text-paper/70 hover:text-brand-light">
              {assessmentLabel}
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
