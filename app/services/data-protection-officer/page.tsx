import type { Metadata } from "next";
import Link from "next/link";
import { Ledger, LedgerLabel, LedgerRow, LedgerPrice } from "@/components/Ledger";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { CycleIcon } from "@/components/icons";
import { guardOffer } from "@/config/offers";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "GUARD: Data Protection Officer as a Service",
  description:
    "GUARD gives Jamaican firms a named data-protection contact, quarterly compliance reviews, a breach-response retainer, and annual re-registration handling. From US$500/month.",
  alternates: { canonical: "/services/data-protection-officer" },
  keywords: ["data protection officer Jamaica", "DPO as a service Jamaica"],
};

const deliverables = [
  {
    name: "A named data-protection contact",
    detail: "One person accountable for your compliance, reachable when you need them, not a ticket queue.",
  },
  {
    name: "Quarterly compliance reviews",
    detail: "A structured check that your policies, registrations, and practices still match what the Act requires.",
  },
  {
    name: "Breach-response retainer",
    detail: "A plan and a point of contact ready before 2 a.m., not assembled during it.",
  },
  {
    name: "Annual re-registration handling",
    detail: "We track renewal dates and file on your behalf so registration never lapses quietly.",
  },
  {
    name: "Annual staff awareness session",
    detail: "A short, practical session so your team understands their role in staying compliant.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Data Protection Officer as a Service",
  name: "GUARD",
  description: metadata.description,
  provider: { "@type": "Organization", name: siteConfig.legalName },
  areaServed: "JM",
  url: `${siteConfig.siteUrl}/services/data-protection-officer`,
};

export default function DataProtectionOfficerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-line bg-schematic">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <span className="mb-6 flex h-12 w-12 items-center justify-center border border-line bg-surface">
            <CycleIcon className="h-6 w-6 text-brand" />
          </span>
          <LedgerLabel>GUARD</LedgerLabel>
          <h1 className="mt-3 text-4xl font-medium text-ink sm:text-5xl">
            Compliance isn&apos;t a one-time event.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            Registration renews. Staff change. Systems change. Breaches, when they happen, don&apos;t
            wait for business hours. GUARD is a standing data-protection function for firms that
            don&apos;t have one in-house.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>What&apos;s included</LedgerLabel>
          <h2 className="mt-3 text-2xl font-medium text-ink">A standing data-protection function.</h2>
          <Ledger className="mt-8">
            {deliverables.map((item, i) => (
              <LedgerRow key={item.name} index={i + 1}>
                <p className="font-display text-lg text-ink">{item.name}</p>
                <p className="mt-1 text-base text-ink-muted">{item.detail}</p>
              </LedgerRow>
            ))}
          </Ledger>
        </Reveal>
      </section>

      <section className="border-b border-line">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>The terms</LedgerLabel>
          <div className="mt-3">
            <LedgerPrice price={guardOffer.price} detail={guardOffer.priceDetail} />
          </div>
          <ul className="mt-6 space-y-2 text-base text-ink-muted">
            <li className="border-t border-line pt-2">{guardOffer.term}.</li>
            <li className="border-t border-line pt-2">{guardOffer.billing}</li>
          </ul>
        </Reveal>
      </section>

      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-12 text-center">
          <p className="text-base text-ink-muted">
            Most GUARD clients start with the assessment.{" "}
            <Link href="/services/dpa-compliance" className="link-underline font-semibold text-brand">
              See COMPLY &rarr;
            </Link>
          </p>
        </Reveal>
      </section>

      <CtaBand
        heading="Put a named contact on this."
        subhead={`${guardOffer.price} per month, ${guardOffer.term.toLowerCase()}.`}
      />
    </>
  );
}
