import type { Metadata } from "next";
import Link from "next/link";
import { Ledger, LedgerLabel, LedgerRow, LedgerPrice } from "@/components/Ledger";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { ScanIcon } from "@/components/icons";
import { assessmentOffer } from "@/config/offers";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Security Assessments: Vulnerability & Posture Review",
  description:
    "AESURUS's security assessment: external and internal vulnerability review, a plain-English findings report ranked by real risk, and a remediation roadmap your existing IT provider can execute. From US$2,000 fixed.",
  alternates: { canonical: "/services/security-assessments" },
};

const included = [
  {
    name: "External vulnerability review",
    detail: "What's visible and reachable from outside your network.",
  },
  {
    name: "Internal vulnerability review",
    detail: "What's exposed once someone, or something, is already inside.",
  },
  {
    name: "Plain-English findings report",
    detail: "Ranked by real risk to your firm, not a raw scanner output nobody reads.",
  },
  {
    name: "Remediation roadmap",
    detail: "Specific, sequenced fixes your existing IT provider can execute directly.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Security assessment",
  name: "Security Assessment",
  description: metadata.description,
  provider: { "@type": "Organization", name: siteConfig.legalName },
  areaServed: "JM",
  url: `${siteConfig.siteUrl}/services/security-assessments`,
};

export default function SecurityAssessmentsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-line bg-schematic">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <span className="mb-6 flex h-12 w-12 items-center justify-center border border-line bg-surface">
            <ScanIcon className="h-6 w-6 text-brand" />
          </span>
          <LedgerLabel>Security Assessment</LedgerLabel>
          <h1 className="mt-3 text-4xl font-medium text-ink sm:text-5xl">
            Find out what&apos;s actually exposed, before someone else does.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            A vulnerability review and security posture assessment: what&apos;s exposed, how
            serious it actually is, and what to do about it, in that order.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>Why this is safe to buy</LedgerLabel>
          <h2 className="mt-3 text-2xl font-medium text-ink">
            Your IT provider can execute the fix.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-muted">
            This assessment doesn&apos;t require replacing your IT provider. The output is a
            remediation roadmap written so your existing provider can act on it directly. We tell
            you what&apos;s wrong and what to do about it; who implements it is your call.
          </p>
        </Reveal>
      </section>

      <section className="border-b border-line">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>What&apos;s included</LedgerLabel>
          <Ledger className="mt-8">
            {included.map((item, i) => (
              <LedgerRow key={item.name} index={i + 1}>
                <p className="font-display text-lg text-ink">{item.name}</p>
                <p className="mt-1 text-base text-ink-muted">{item.detail}</p>
              </LedgerRow>
            ))}
          </Ledger>
        </Reveal>
      </section>

      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>The terms</LedgerLabel>
          <div className="mt-3">
            <LedgerPrice price={assessmentOffer.price} detail={assessmentOffer.priceDetail} />
          </div>
          <p className="mt-6 border-t border-line pt-2 text-base text-ink-muted">
            {assessmentOffer.timeline}, depending on scope.
          </p>
        </Reveal>
      </section>

      <section className="border-b border-line">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-12 text-center">
          <p className="text-base text-ink-muted">
            This covers the technical exposure. COMPLY covers the legal exposure; most firms need
            both.{" "}
            <Link href="/services/dpa-compliance" className="link-underline font-semibold text-brand">
              See COMPLY &rarr;
            </Link>{" "}
            or{" "}
            <Link href="/services/managed-security" className="link-underline font-semibold text-brand">
              see SHIELD MSP &rarr;
            </Link>
          </p>
        </Reveal>
      </section>

      <CtaBand
        heading="Find out what's exposed."
        subhead={`${assessmentOffer.price} fixed, ${assessmentOffer.timeline.toLowerCase()}.`}
        assessmentHref="/assessment/security"
        assessmentLabel="Not sure? Take the free Cyber Readiness Check first"
      />
    </>
  );
}
