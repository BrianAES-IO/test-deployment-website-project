import type { Metadata } from "next";
import Link from "next/link";
import { Ledger, LedgerLabel, LedgerRow } from "@/components/Ledger";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { PulseIcon } from "@/components/icons";
import { shieldOffer } from "@/config/offers";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "SHIELD MSP: Managed Security, Sophos-Based",
  description:
    "SHIELD MSP is AESURUS's managed security service: endpoints monitored and defended around the clock on Sophos, with a monthly report in plain English. From US$900/month.",
  alternates: { canonical: "/services/managed-security" },
  keywords: ["managed IT security Jamaica", "managed security services Jamaica"],
};

const outcomes = [
  {
    name: "Endpoints monitored and defended, around the clock",
    detail: "Every laptop and server is watched continuously, not checked in on when something breaks.",
  },
  {
    name: "Patching overseen",
    detail: "Security updates are tracked and applied, so known gaps don't sit open for months.",
  },
  {
    name: "A monthly report, in plain English",
    detail: "What happened, what was blocked, and what needs attention: no jargon, no dashboards to interpret yourself.",
  },
  {
    name: "Incident response coordination",
    detail: "If something does happen, one team coordinates the response instead of you managing several vendors at once.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Managed security services",
  name: "SHIELD MSP",
  description: metadata.description,
  provider: { "@type": "Organization", name: siteConfig.legalName },
  areaServed: "JM",
  url: `${siteConfig.siteUrl}/services/managed-security`,
};

export default function ManagedSecurityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-line bg-schematic">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <span className="mb-6 flex h-12 w-12 items-center justify-center border border-line bg-surface">
            <PulseIcon className="h-6 w-6 text-brand" />
          </span>
          <LedgerLabel>SHIELD MSP</LedgerLabel>
          <h1 className="mt-3 text-4xl font-medium text-ink sm:text-5xl">
            The data you protect has to actually be protected.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            SHIELD MSP is managed security built on Sophos endpoint protection and MDR, the
            platform doing the work behind outcomes you can actually check. AESURUS is a Sophos
            partner; we run the platform directly rather than reselling it through a third party.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>What you get</LedgerLabel>
          <h2 className="mt-3 text-2xl font-medium text-ink">Outcomes, not dashboards.</h2>
          <Ledger className="mt-8">
            {outcomes.map((item, i) => (
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
          <h2 className="mt-3 text-2xl font-medium text-ink">Priced by seats.</h2>
          <Ledger className="mt-8">
            {shieldOffer.tiers.map((tier, i) => (
              <LedgerRow key={tier.seats} index={i + 1}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="font-display text-lg text-ink">{tier.seats}</p>
                  <p className="font-mono text-lg text-ink">
                    {tier.price} <span className="text-sm text-ink-muted">{tier.priceDetail}</span>
                  </p>
                </div>
              </LedgerRow>
            ))}
          </Ledger>
          <p className="mt-6 text-base text-ink-muted">{shieldOffer.term}.</p>
        </Reveal>
      </section>

      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <p className="max-w-2xl text-base text-ink-muted">
            We pair security with compliance because they answer different questions. The COMPLY
            assessment tells you what data you hold and what needs protecting. SHIELD MSP protects
            it. Firms that only buy one tend to have found out the gap the hard way.{" "}
            <Link href="/services/dpa-compliance" className="link-underline font-semibold text-brand">
              See COMPLY &rarr;
            </Link>
          </p>
        </Reveal>
      </section>

      <CtaBand
        heading="Get your endpoints under watch."
        subhead={`From ${shieldOffer.tiers[0].price} per month, ${shieldOffer.term.toLowerCase()}.`}
        assessmentHref="/assessment/security"
        assessmentLabel="Take the free Cyber Readiness Check"
      />
    </>
  );
}
