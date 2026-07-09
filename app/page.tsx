import type { Metadata } from "next";
import Link from "next/link";
import { Ledger, LedgerLabel, LedgerRow, LedgerLinkRow } from "@/components/Ledger";
import { OfferCard } from "@/components/OfferCard";
import { CtaBand } from "@/components/CtaBand";
import { IllustrationFrame } from "@/components/IllustrationFrame";
import { KingstonMark } from "@/components/illustrations/KingstonMark";
import { Reveal } from "@/components/motion/Reveal";
import { HeroReveal, HeroItem } from "@/components/motion/HeroReveal";
import { offers, services } from "@/config/offers";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Data Protection Act Compliance for Jamaican Firms",
  description:
    "The Data Protection Act 2020 applies to most Jamaican businesses holding customer, patient, or staff data. AESURUS makes you defensibly compliant and keeps you secure, for fixed fees.",
  alternates: { canonical: "/" },
};

const sectors = [
  "Microcredit institutions",
  "Medical & dental practices",
  "Legal & accounting firms",
  "Credit unions",
  "BPO subcontractors",
];

const steps = [
  {
    name: "Assess",
    detail: "We review your data handling against the Act's requirements and tell you exactly where you stand.",
  },
  {
    name: "Register",
    detail: "We prepare and file your registration with the Information Commissioner's Office, if it's required.",
  },
  {
    name: "Fix",
    detail: "We close the gaps: policies, data inventory, and the practical changes the assessment surfaces.",
  },
  {
    name: "Maintain",
    detail: "We keep you compliant as staff, systems, and the law itself change.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.siteUrl}#organization`,
      name: siteConfig.legalName,
      url: siteConfig.siteUrl,
      logo: `${siteConfig.siteUrl}/logo-blue.png`,
      description: siteConfig.description,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.locality,
        addressCountry: "JM",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.siteUrl}#service`,
      name: siteConfig.legalName,
      description: siteConfig.description,
      url: siteConfig.siteUrl,
      areaServed: "JM",
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.locality,
        addressCountry: "JM",
      },
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        name: service.name,
        description: service.promise,
        url: `${siteConfig.siteUrl}${service.href}`,
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="border-b border-line bg-schematic">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
          <HeroReveal>
            <HeroItem>
              <h1 className="text-4xl font-medium leading-tight text-ink sm:text-5xl">
                The Data Protection Act applies to your business.
                <br />
                <span className="italic text-brand">The liability is personal.</span>
              </h1>
            </HeroItem>
            <HeroItem className="mt-6 max-w-2xl">
              <p className="text-lg text-ink-muted">
                AESURUS makes Jamaican firms defensibly compliant with the Data Protection Act and
                keeps them secure, for fixed fees.
              </p>
            </HeroItem>
            <HeroItem className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/book"
                className="inline-block rounded-sm bg-brand px-8 py-4 font-body text-base font-semibold text-paper transition-colors duration-200 ease-brand hover:bg-brand-deep"
              >
                Book a 15-minute exposure check
              </Link>
              <Link
                href="/assessment/dpa"
                className="inline-block rounded-sm border border-ink px-8 py-4 font-body text-base font-semibold text-ink transition-colors duration-200 ease-brand hover:bg-ink hover:text-paper"
              >
                Check your exposure in 3 minutes, free
              </Link>
            </HeroItem>
          </HeroReveal>
        </div>
      </section>

      {/* Three silent questions */}
      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <Ledger>
            <LedgerRow index={1}>
              <LedgerLabel>Does this law apply to me?</LedgerLabel>
              <p className="mt-2 text-base text-ink">
                Yes, if you hold personal data on customers, patients, clients, or staff.
              </p>
            </LedgerRow>
            <LedgerRow index={2}>
              <LedgerLabel>What happens if I ignore it?</LedgerLabel>
              <p className="mt-2 text-base text-ink">
                Registration and compliance obligations are enforceable, and directors carry
                responsibility for them.
              </p>
            </LedgerRow>
            <LedgerRow index={3}>
              <LedgerLabel>What does fixing it cost?</LedgerLabel>
              <p className="mt-2 text-base text-ink">
                A fixed fee, stated on this site: {offers[0].price} for the assessment.
              </p>
            </LedgerRow>
          </Ledger>
        </Reveal>
      </section>

      {/* Offer ladder */}
      <section className="border-b border-line">
        <Reveal as="div" className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <LedgerLabel>What we do</LedgerLabel>
            <h2 className="mt-3 text-3xl font-medium text-ink">Three engagements. Fixed terms.</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer, i) => (
              <OfferCard key={offer.slug} offer={offer} index={i + 1} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* The full practice */}
      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <div>
              <LedgerLabel>The full practice</LedgerLabel>
              <h2 className="mt-3 text-2xl font-medium text-ink">All five service lines.</h2>
            </div>
            <Link href="/services" className="link-underline text-sm font-semibold text-brand">
              View all services &rarr;
            </Link>
          </div>
          <div className="mt-8">
            {services.map((service, i) => (
              <LedgerLinkRow
                key={service.slug}
                index={i + 1}
                href={service.href}
                label={service.tagline}
                description={service.promise}
                icon={service.icon}
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* Who we work with */}
      <section className="border-b border-line">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>Who we work with</LedgerLabel>
          <h2 className="mt-3 text-2xl font-medium text-ink">
            Firms that hold data they&apos;re personally responsible for.
          </h2>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {sectors.map((sector) => (
              <li key={sector} className="border-t border-line py-3 text-base text-ink">
                {sector}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Based in Kingston */}
      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <LedgerLabel>Based in Kingston</LedgerLabel>
            <h2 className="mt-3 text-2xl font-medium text-ink">
              An accountable team, not a call center.
            </h2>
            <p className="mt-4 max-w-md text-base text-ink-muted">
              AESURUS works out of Kingston, Jamaica, in person and remotely, across the compliance,
              security, and cloud engagements above. The team that scopes your engagement is the
              team that delivers it.
            </p>
          </div>
          <IllustrationFrame>
            <KingstonMark className="h-full w-full p-8" />
          </IllustrationFrame>
        </Reveal>
      </section>

      {/* How the assessment works */}
      <section id="how-it-works" className="border-b border-line">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>How the assessment works</LedgerLabel>
          <h2 className="mt-3 text-2xl font-medium text-ink">Four steps, in order.</h2>
          <Ledger className="mt-8">
            {steps.map((step, i) => (
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
