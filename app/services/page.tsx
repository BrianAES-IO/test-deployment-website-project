import type { Metadata } from "next";
import Link from "next/link";
import { Ledger, LedgerLabel, LedgerRow, LedgerPrice } from "@/components/Ledger";
import { CtaBand } from "@/components/CtaBand";
import { IllustrationFrame } from "@/components/IllustrationFrame";
import { DataNetwork } from "@/components/illustrations/DataNetwork";
import { Reveal } from "@/components/motion/Reveal";
import { services, type Service } from "@/config/offers";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AESURUS's full practice: Data Protection Act compliance, DPO-as-a-service, managed security, cloud services, and security assessments, one accountable firm, fixed fees.",
  alternates: { canonical: "/services" },
};

const catalogCopy: Record<Service["slug"], { description: string; includes: string[] }> = {
  comply: {
    description:
      "A structured assessment of your data handling against the Data Protection Act's standards. You get a written report telling you exactly where you stand and what needs fixing.",
    includes: [
      "Gap review against the Act's standards",
      "Data inventory",
      "OIC registration filing support, where required",
      "Policy pack",
      "Executive briefing",
    ],
  },
  guard: {
    description:
      "A standing data-protection function for firms that don't have one in-house. A named contact keeps your registration, policies, and practices current as they change.",
    includes: [
      "A named data-protection contact",
      "Quarterly compliance reviews",
      "Breach-response retainer",
      "Annual re-registration handling",
      "Annual staff awareness session",
    ],
  },
  shield: {
    description:
      "Managed endpoint protection and detection built on Sophos, monitored continuously. You get a plain-English report each month instead of a dashboard to interpret yourself.",
    includes: [
      "Endpoints monitored and defended around the clock",
      "Patching overseen",
      "A monthly report, in plain English",
      "Incident response coordination",
    ],
  },
  cloud: {
    description:
      "Managed cloud environments on Microsoft Azure, built and migrated end-to-end by AESURUS. Each environment is logically isolated with encryption keys your firm holds, not us.",
    includes: [
      "Environment build on Microsoft Azure",
      "End-to-end migration",
      "Logical isolation per client",
      "Customer-held encryption keys",
      "Managed backup and recovery",
    ],
  },
  assessment: {
    description:
      "An external and internal review of your technical exposure, ranked by real risk rather than a generic checklist. The findings come with a roadmap your existing IT provider can execute.",
    includes: [
      "External vulnerability review",
      "Internal vulnerability review",
      "Plain-English findings report, ranked by risk",
      "Remediation roadmap your IT provider can act on",
    ],
  },
};

const engagementSteps = [
  { name: "Exposure check", detail: "A free 15-minute call to establish whether, and where, you're exposed." },
  { name: "Assessment", detail: "A scoped engagement (COMPLY, a security assessment, or both) that documents your actual position." },
  { name: "Fixed-fee proposal", detail: "A specific price for the specific work the assessment surfaced. No open-ended estimates." },
  { name: "Delivery", detail: "The engagement is delivered to the agreed scope and timeline." },
  { name: "Ongoing retainer", detail: "Where needed, GUARD, SHIELD MSP, or Cloud Enclave management keeps you current after delivery." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-schematic">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-20 md:grid-cols-[1fr_320px] md:items-center">
          <div>
            <LedgerLabel>Services</LedgerLabel>
            <h1 className="mt-3 text-4xl font-medium text-ink sm:text-5xl">The full practice.</h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-muted">
              AESURUS is advisory-led and fixed-fee: one accountable firm across compliance,
              security, and cloud, rather than three vendors you have to coordinate yourself.
            </p>
          </div>
          <IllustrationFrame aspect="square" className="hidden md:flex">
            <DataNetwork className="h-full w-full p-6" />
          </IllustrationFrame>
        </div>
      </section>

      {services.map((service, i) => {
        const copy = catalogCopy[service.slug];
        return (
          <section key={service.slug} className={`border-b border-line ${i % 2 === 1 ? "bg-surface" : ""}`}>
            <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                <div className="flex items-start gap-4">
                  <service.icon className="mt-1 h-8 w-8 shrink-0 text-brand" />
                  <div>
                    <LedgerLabel>{service.tagline}</LedgerLabel>
                    <h2 className="mt-2 font-display text-2xl font-medium text-ink sm:text-3xl">
                      {service.name}
                    </h2>
                  </div>
                </div>
                <LedgerPrice price={service.price} detail={service.priceDetail} />
              </div>

              <p className="mt-5 max-w-2xl text-base text-ink-muted">{copy.description}</p>

              <Ledger className="mt-8">
                {copy.includes.map((item, idx) => (
                  <LedgerRow key={item} index={idx + 1}>
                    <p className="text-base text-ink">{item}</p>
                  </LedgerRow>
                ))}
              </Ledger>

              <Link
                href={service.href}
                className="group mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand"
              >
                View {service.name}
                <span className="transition-transform duration-200 ease-brand group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </Reveal>
          </section>
        );
      })}

      <section className="border-b border-line">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>How engagements work</LedgerLabel>
          <h2 className="mt-3 text-2xl font-medium text-ink">Exposure check to ongoing retainer.</h2>
          <Ledger className="mt-8">
            {engagementSteps.map((step, i) => (
              <LedgerRow key={step.name} index={i + 1}>
                <p className="font-display text-lg text-ink">{step.name}</p>
                <p className="mt-1 text-base text-ink-muted">{step.detail}</p>
              </LedgerRow>
            ))}
          </Ledger>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
