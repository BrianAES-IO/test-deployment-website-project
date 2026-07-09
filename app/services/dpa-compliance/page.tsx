import type { Metadata } from "next";
import { Ledger, LedgerLabel, LedgerRow, LedgerPrice } from "@/components/Ledger";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { DocumentIcon } from "@/components/icons";
import { complyOffer } from "@/config/offers";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "COMPLY: Data Protection Act Compliance Assessment",
  description:
    "COMPLY is AESURUS's fixed-fee Data Protection Act readiness assessment for Jamaican firms: gap review, data inventory, OIC registration support, and a policy pack. From US$3,500, delivered in 2–3 weeks.",
  alternates: { canonical: "/services/dpa-compliance" },
  keywords: ["Data Protection Act Jamaica compliance", "DPA 2020 Jamaica", "OIC registration Jamaica"],
};

const standards = [
  {
    name: "Fair and lawful processing",
    detail: "Personal data is collected and used on a proper basis, and people know it's happening.",
  },
  {
    name: "Purpose limitation",
    detail: "Data collected for one reason isn't quietly repurposed for another.",
  },
  {
    name: "Data minimisation",
    detail: "You hold what you need, not everything you could.",
  },
  {
    name: "Accuracy",
    detail: "Records are kept correct and current.",
  },
  {
    name: "Storage limitation",
    detail: "Data isn't kept indefinitely once its purpose has passed.",
  },
  {
    name: "Security and confidentiality",
    detail: "Data is protected against loss, misuse, and unauthorised access.",
  },
  {
    name: "Accountability",
    detail: "You can show, not just claim, that the above is true.",
  },
];

const included = [
  {
    name: "Gap review",
    detail: "A structured review of your current data handling against the Act's standards.",
  },
  {
    name: "Data inventory",
    detail: "A record of what personal data you hold, where it lives, and who can reach it.",
  },
  {
    name: "OIC registration filing support",
    detail: "We prepare and support the filing of your registration with the Information Commissioner's Office, where required.",
  },
  {
    name: "Policy pack",
    detail: "The written policies a compliant firm needs, in plain language your staff will actually read.",
  },
  {
    name: "Executive briefing",
    detail: "A short session with your leadership covering findings, exposure, and what to do next.",
  },
];

const faqItems = [
  {
    question: "We're too small for this to apply to us.",
    answer:
      "Size isn't the test; holding personal data is. A five-person clinic with patient files is in scope the same way a 500-person company is. The assessment tells you precisely what your size and sector require.",
  },
  {
    question: "Our IT company already handles this.",
    answer:
      "IT support and data-protection compliance are different disciplines. An IT provider secures your systems; the Act requires documented policies, a lawful basis for processing, and, often, formal registration. Most IT contracts don't cover any of that.",
  },
  {
    question: "What if the assessment finds problems?",
    answer:
      "It's designed to. Finding the gaps while they're still just gaps, not incidents, is the point. You get a clear list of what needs fixing and, if you want it, our help fixing it.",
  },
  {
    question: "Do we have to register with the OIC?",
    answer:
      "It depends on what data you process and how. The assessment tells you definitively, and if registration applies, we handle the filing as part of the engagement.",
  },
  {
    question: "What happens after the assessment?",
    answer:
      "You get a written report and the policy pack, regardless of what happens next. Many firms move to GUARD for ongoing compliance; some just implement the report themselves. Both are fine outcomes.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. It's a structured compliance assessment. For matters requiring formal legal opinion, we'll tell you plainly and point you to counsel.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Data Protection Act compliance assessment",
  name: "COMPLY",
  description: metadata.description,
  provider: { "@type": "Organization", name: siteConfig.legalName },
  areaServed: "JM",
  url: `${siteConfig.siteUrl}/services/dpa-compliance`,
};

export default function DpaCompliancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-line bg-schematic">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <span className="mb-6 flex h-12 w-12 items-center justify-center border border-line bg-surface">
            <DocumentIcon className="h-6 w-6 text-brand" />
          </span>
          <LedgerLabel>COMPLY</LedgerLabel>
          <h1 className="mt-3 text-4xl font-medium text-ink sm:text-5xl">
            Know exactly where you stand under the Data Protection Act.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            The DPA 2020 sets out specific standards for how Jamaican firms must handle personal
            data. COMPLY tells you, in writing, whether you meet them, and fixes what doesn&apos;t.
          </p>
        </div>
      </section>

      {/* The obligation */}
      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>The obligation</LedgerLabel>
          <h2 className="mt-3 text-2xl font-medium text-ink">
            What the Act requires of a firm like yours.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-muted">
            If you hold personal data on customers, patients, clients, or staff, the Act sets
            standards for how that data is collected, used, stored, and protected. This is a
            descriptive summary, not a substitute for the statute itself:
          </p>
          <Ledger className="mt-8">
            {standards.map((s, i) => (
              <LedgerRow key={s.name} index={i + 1}>
                <p className="font-display text-lg text-ink">{s.name}</p>
                <p className="mt-1 text-base text-ink-muted">{s.detail}</p>
              </LedgerRow>
            ))}
          </Ledger>
        </Reveal>
      </section>

      {/* The exposure */}
      <section className="border-b border-line">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>The exposure</LedgerLabel>
          <h2 className="mt-3 text-2xl font-medium text-ink">What non-compliance means.</h2>
          <p className="mt-4 max-w-2xl text-base text-ink-muted">
            Registration and compliance obligations under the Act are enforceable by the
            Information Commissioner&apos;s Office, which has powers of investigation and
            enforcement. Responsibility for compliance sits with the firm&apos;s directors, not
            with an IT provider or a junior staff member. Most firms don&apos;t find out where
            they stand until something has already gone wrong.
          </p>
        </Reveal>
      </section>

      {/* The fix */}
      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>The fix</LedgerLabel>
          <h2 className="mt-3 text-2xl font-medium text-ink">What COMPLY includes.</h2>
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

      {/* The terms */}
      <section className="border-b border-line">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>The terms</LedgerLabel>
          <div className="mt-3">
            <LedgerPrice price={complyOffer.price} detail={complyOffer.priceDetail} />
          </div>
          <ul className="mt-6 space-y-2 text-base text-ink-muted">
            <li className="border-t border-line pt-2">{complyOffer.timeline}.</li>
            <li className="border-t border-line pt-2">{complyOffer.billing}</li>
          </ul>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>Questions we&apos;re asked</LedgerLabel>
          <h2 className="mt-3 text-2xl font-medium text-ink">Before you book.</h2>
          <div className="mt-8">
            <Faq items={faqItems} />
          </div>
        </Reveal>
      </section>

      <CtaBand
        heading="Start with the assessment."
        subhead={`${complyOffer.price} fixed, ${complyOffer.timeline.toLowerCase()}.`}
        ctaLabel="Book a 15-minute exposure check"
        assessmentLabel="Not sure? Get your free exposure score first"
      />
    </>
  );
}
