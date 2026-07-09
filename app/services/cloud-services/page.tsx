import type { Metadata } from "next";
import Link from "next/link";
import { Ledger, LedgerLabel, LedgerRow } from "@/components/Ledger";
import { CtaBand } from "@/components/CtaBand";
import { IllustrationFrame } from "@/components/IllustrationFrame";
import { CloudArchitecture } from "@/components/illustrations/CloudArchitecture";
import { Reveal } from "@/components/motion/Reveal";
import { CloudIcon } from "@/components/icons";
import { cloudOffer } from "@/config/offers";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cloud Enclave: Managed Cloud on Microsoft Azure",
  description:
    "Cloud Enclave is AESURUS's managed cloud service on Microsoft Azure: logically isolated environments with customer-held encryption keys, migration handled end-to-end, and managed backup and recovery.",
  alternates: { canonical: "/services/cloud-services" },
  keywords: ["cloud services Jamaica", "Azure cloud Jamaica"],
};

const whoFor = [
  "Firms with data-residency sensitivity: client files, patient records, borrower information",
  "Professional-services firms moving off on-premise servers",
  "Regulated SMBs that need to show, not just claim, control over where data sits",
];

const included = [
  {
    name: "Environment build",
    detail: "Your Azure environment, architected for your firm rather than a generic template.",
  },
  {
    name: "End-to-end migration",
    detail: "AESURUS handles the move; we don't hand you a runbook and leave.",
  },
  {
    name: "Logical isolation",
    detail: "Your environment is logically isolated from other clients' environments, not shared infrastructure with a label on it.",
  },
  {
    name: "Customer-held encryption keys",
    detail: "Your data is encrypted with keys your firm holds. AESURUS manages the environment; we don't hold the keys to your data.",
  },
  {
    name: "Managed backup and recovery",
    detail: "Backups are monitored and tested as part of the retainer, not left to run silently until you need one.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Managed cloud services",
  name: "Cloud Enclave",
  description: metadata.description,
  provider: { "@type": "Organization", name: siteConfig.legalName },
  areaServed: "JM",
  url: `${siteConfig.siteUrl}/services/cloud-services`,
};

export default function CloudServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-line bg-schematic">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <span className="mb-6 flex h-12 w-12 items-center justify-center border border-line bg-surface">
            <CloudIcon className="h-6 w-6 text-brand" />
          </span>
          <LedgerLabel>Cloud Enclave</LedgerLabel>
          <h1 className="mt-3 text-4xl font-medium text-ink sm:text-5xl">
            Cloud capability without losing control of your data.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            Jamaican firms holding client files, patient records, or borrower information need
            cloud infrastructure without handing over control of that data to get it. Cloud
            Enclave is managed cloud on Microsoft Azure, built so you keep that control.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto grid max-w-4xl gap-10 px-6 py-16 md:grid-cols-[1fr_260px] md:items-start">
          <div>
            <LedgerLabel>The approach</LedgerLabel>
            <h2 className="mt-3 text-2xl font-medium text-ink">
              Logically isolated, with keys your firm holds.
            </h2>
            <p className="mt-4 max-w-2xl text-base text-ink-muted">
              Each Cloud Enclave environment is logically isolated per client, with encryption keys
              held by your firm rather than by AESURUS. That is the precise claim we make: a
              logically isolated environment with customer-held encryption keys, not an absolute or
              unconditional security guarantee. AESURUS is a Microsoft partner and builds these
              environments on Azure directly.
            </p>
          </div>
          <IllustrationFrame aspect="square">
            <CloudArchitecture className="h-full w-full p-6" />
          </IllustrationFrame>
        </Reveal>
      </section>

      <section className="border-b border-line">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>Who it&apos;s for</LedgerLabel>
          <Ledger className="mt-8">
            {whoFor.map((item, i) => (
              <LedgerRow key={item} index={i + 1}>
                <p className="text-base text-ink">{item}</p>
              </LedgerRow>
            ))}
          </Ledger>
        </Reveal>
      </section>

      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>What&apos;s included</LedgerLabel>
          <h2 className="mt-3 text-2xl font-medium text-ink">Built, migrated, and managed.</h2>
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

      <section className="border-b border-line">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>The terms</LedgerLabel>
          <h2 className="mt-3 text-2xl font-medium text-ink">
            Scoped migration, then a monthly retainer.
          </h2>
          <Ledger className="mt-8">
            <LedgerRow index="Migration">
              <p className="font-display text-lg text-ink">{cloudOffer.migration.price}</p>
              <p className="mt-1 text-base text-ink-muted">{cloudOffer.migration.detail}</p>
            </LedgerRow>
            <LedgerRow index="Management">
              <p className="font-display text-lg text-ink">
                {cloudOffer.management.price}{" "}
                <span className="text-base text-ink-muted">{cloudOffer.management.priceDetail}</span>
              </p>
              <p className="mt-1 text-base text-ink-muted">{cloudOffer.management.detail}</p>
            </LedgerRow>
          </Ledger>
        </Reveal>
      </section>

      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-12 text-center">
          <p className="text-base text-ink-muted">
            Migrating sensitive data is also a compliance question.{" "}
            <Link href="/services/dpa-compliance" className="link-underline font-semibold text-brand">
              See COMPLY &rarr;
            </Link>
          </p>
        </Reveal>
      </section>

      <CtaBand
        heading="Scope your migration."
        subhead={`Migration priced by scope. Management: ${cloudOffer.management.price} per month.`}
      />
    </>
  );
}
