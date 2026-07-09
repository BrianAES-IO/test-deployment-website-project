import type { Metadata } from "next";
import { Ledger, LedgerLabel, LedgerRow } from "@/components/Ledger";
import { BriefingForm } from "@/components/BriefingForm";
import { Reveal } from "@/components/motion/Reveal";
import { CalendarIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Directors' Liability Briefing",
  description:
    "A monthly 90-minute briefing for managing directors and partners on personal liability under Jamaica's Data Protection Act. Seats limited to 15.",
  alternates: { canonical: "/briefing" },
};

const covers = [
  "What the Data Protection Act actually requires of your firm",
  "Where personal director liability begins and ends",
  "What OIC registration involves, and whether you likely need it",
  "The questions to ask before you sign off on any compliance spend",
];

export default function BriefingPage() {
  return (
    <>
      <section className="border-b border-line bg-schematic">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <span className="mb-6 flex h-12 w-12 items-center justify-center border border-line bg-surface">
            <CalendarIcon className="h-6 w-6 text-brand" />
          </span>
          <LedgerLabel>Directors&apos; Liability Briefing</LedgerLabel>
          <h1 className="mt-3 text-4xl font-medium text-ink sm:text-5xl">
            A 90-minute briefing for the person who signs off, not the person who implements.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            Held monthly, built for managing directors and partners, not IT staff. Seats are
            limited to 15 so the session stays a conversation, not a webinar.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <Reveal as="div" className="mx-auto max-w-4xl px-6 py-16">
          <LedgerLabel>What it covers</LedgerLabel>
          <Ledger className="mt-8">
            {covers.map((item, i) => (
              <LedgerRow key={item} index={i + 1}>
                <p className="text-base text-ink">{item}</p>
              </LedgerRow>
            ))}
          </Ledger>
        </Reveal>
      </section>

      <section>
        <Reveal as="div" className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
          <LedgerLabel>Reserve your seat</LedgerLabel>
          <h2 className="mt-3 text-2xl font-medium text-ink">15 seats. Next session monthly.</h2>
          <div className="mt-8">
            <BriefingForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
