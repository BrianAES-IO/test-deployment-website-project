import type { Metadata } from "next";
import { LedgerLabel } from "@/components/Ledger";
import { CtaBand } from "@/components/CtaBand";
import { IllustrationFrame } from "@/components/IllustrationFrame";
import { FounderMark } from "@/components/illustrations/FounderMark";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "AESURUS is a Kingston-based data-protection and security advisory firm working on fixed fees, in plain language, with real engineering depth behind the advice.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-schematic">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <LedgerLabel>About</LedgerLabel>
          <h1 className="mt-3 text-4xl font-medium text-ink sm:text-5xl">
            Restraint, plain language, and a fixed fee.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            AESURUS is a data-protection and security advisory firm based in Kingston, Jamaica. We
            work with firms that hold personal data they&apos;re responsible for, and we say what
            we mean: what the law requires, what it costs to fix, and what happens next. The
            advice is backed by an engineering team that also delivers it: compliance, security,
            and cloud, under one accountable firm.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto grid max-w-4xl gap-10 px-6 py-16 sm:grid-cols-[200px_1fr] sm:items-start">
          <IllustrationFrame aspect="portrait" className="w-[200px]">
            <FounderMark className="h-full w-full" />
          </IllustrationFrame>
          <div>
            <LedgerLabel>Founder</LedgerLabel>
            <h2 className="mt-3 text-2xl font-medium text-ink">Brian</h2>
            <p className="mt-4 max-w-2xl text-base text-ink-muted">
              {/* TODO: replace with Brian's real bio, factual, 3-4 sentences, no embellishment. */}
              Brian founded AESURUS to bring structured, fixed-fee data-protection compliance to
              Jamaican firms who had no practical way to get it. He leads the firm&apos;s assessment
              and advisory work directly, and is the named contact for GUARD clients who choose that
              engagement.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-b border-line">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>Partnerships</LedgerLabel>
          <h2 className="mt-3 text-2xl font-medium text-ink">Who we work through.</h2>
          <p className="mt-4 max-w-2xl text-base text-ink-muted">
            SHIELD MSP is built on Sophos endpoint protection and MDR, delivered under AESURUS&apos;s
            direct Sophos partnership. Cloud Enclave is built on Microsoft Azure under AESURUS&apos;s
            Microsoft partnership. AESURUS also sources hardware and licensing through MC3
            distribution. All three are direct partnerships AESURUS holds itself, not relationships
            borrowed from another provider.
          </p>
        </Reveal>
      </section>

      <section>
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>Location</LedgerLabel>
          <h2 className="mt-3 text-2xl font-medium text-ink">Kingston, Jamaica.</h2>
          <p className="mt-4 max-w-2xl text-base text-ink-muted">
            We work with firms across Jamaica, in person and remotely, from our base in Kingston.
          </p>
        </Reveal>
      </section>

      {/*
        TODO: once the first client engagements complete, add case studies here.
        Two short, factual client outcomes (with permission) would do more than
        any amount of description. Leave this commented out until they exist;
        do not fabricate placeholder testimonials.

        <section className="border-t border-line">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <LedgerLabel>What clients say</LedgerLabel>
            ...
          </div>
        </section>
      */}

      <CtaBand />
    </>
  );
}
