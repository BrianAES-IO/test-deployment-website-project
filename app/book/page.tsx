import type { Metadata } from "next";
import { LedgerLabel } from "@/components/Ledger";
import { siteConfig, whatsappLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Book a 15-Minute Exposure Check",
  description: "Book a 15-minute call to find out plainly whether the Data Protection Act applies to your firm and what it would take to comply.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  const { bookingUrl } = siteConfig;

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <LedgerLabel>Book a call</LedgerLabel>
      <h1 className="mt-3 text-4xl font-medium text-ink sm:text-5xl">
        A 15-minute exposure check.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-ink-muted">
        No pitch. We ask a handful of questions about your firm and tell you plainly whether the
        Data Protection Act applies to you and what fixing it would take.
      </p>

      <div className="mt-10">
        {bookingUrl ? (
          <div className="border border-line">
            <iframe
              src={bookingUrl}
              title="Book a 15-minute exposure check"
              className="h-[720px] w-full"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="border border-line bg-surface p-8">
            <p className="text-base text-ink-muted">
              Online booking isn&apos;t connected yet. In the meantime, reach us directly:
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`mailto:${siteConfig.contact.email}?subject=15-minute exposure check`}
                className="inline-block rounded-sm bg-brand px-6 py-3 text-center font-semibold text-paper transition-colors duration-200 ease-brand hover:bg-brand-deep"
              >
                Email {siteConfig.contact.email}
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="inline-block rounded-sm border border-ink px-6 py-3 text-center font-semibold text-ink transition-colors duration-200 ease-brand hover:bg-ink hover:text-paper"
              >
                Call {siteConfig.contact.phone}
              </a>
              <a
                href={whatsappLink("Hi, I'd like to book a 15-minute exposure check.")}
                className="inline-block rounded-sm border border-ink px-6 py-3 text-center font-semibold text-ink transition-colors duration-200 ease-brand hover:bg-ink hover:text-paper"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
