import type { Metadata } from "next";
import { Ledger, LedgerLabel, LedgerRow } from "@/components/Ledger";
import { complyOffer, guardOffer, shieldOffer, cloudOffer, assessmentOffer } from "@/config/offers";

export const metadata: Metadata = {
  title: "Engagement Terms",
  description: "A plain-language summary of how AESURUS engagements are structured and billed.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <LedgerLabel>Engagement Terms</LedgerLabel>
      <h1 className="mt-3 text-4xl font-medium text-ink">How engagements are structured.</h1>
      <p className="mt-6 max-w-2xl text-lg text-ink-muted">
        This page is a plain-language summary for reference. It isn&apos;t the operative contract:
        every engagement is confirmed in a signed letter or agreement that governs the specific
        relationship, and that document takes precedence over this summary.
      </p>

      <Ledger className="mt-12">
        <LedgerRow index="COMPLY">
          <p className="font-display text-lg text-ink">
            {complyOffer.price} <span className="text-base text-ink-muted">{complyOffer.priceDetail}</span>
          </p>
          <p className="mt-2 max-w-2xl text-base text-ink-muted">
            {complyOffer.timeline}. {complyOffer.billing} Payment is due on commencement unless
            otherwise agreed in writing.
          </p>
        </LedgerRow>

        <LedgerRow index="GUARD">
          <p className="font-display text-lg text-ink">
            {guardOffer.price} <span className="text-base text-ink-muted">{guardOffer.priceDetail}</span>
          </p>
          <p className="mt-2 max-w-2xl text-base text-ink-muted">
            {guardOffer.term}. {guardOffer.billing} Cancellation and renewal terms are set out in
            the signed engagement letter.
          </p>
        </LedgerRow>

        <LedgerRow index="SHIELD MSP">
          <p className="font-display text-lg text-ink">
            From {shieldOffer.tiers[0].price}{" "}
            <span className="text-base text-ink-muted">{shieldOffer.tiers[0].priceDetail}</span>
          </p>
          <p className="mt-2 max-w-2xl text-base text-ink-muted">
            Priced by seat count as shown on the SHIELD MSP page. {shieldOffer.term}. Billing
            frequency is confirmed in the engagement letter.
          </p>
        </LedgerRow>

        <LedgerRow index="Cloud Enclave">
          <p className="font-display text-lg text-ink">
            {cloudOffer.migration.price}{" "}
            <span className="text-base text-ink-muted">
              migration; {cloudOffer.management.price} {cloudOffer.management.priceDetail} management
            </span>
          </p>
          <p className="mt-2 max-w-2xl text-base text-ink-muted">
            Migration is scoped and quoted after the exposure check. The management retainer is
            billed monthly and confirmed in the engagement letter.
          </p>
        </LedgerRow>

        <LedgerRow index="Security Assessment">
          <p className="font-display text-lg text-ink">
            {assessmentOffer.price} <span className="text-base text-ink-muted">{assessmentOffer.priceDetail}</span>
          </p>
          <p className="mt-2 max-w-2xl text-base text-ink-muted">
            {assessmentOffer.timeline}, depending on scope. Payment is due on commencement unless
            otherwise agreed in writing.
          </p>
        </LedgerRow>
      </Ledger>

      <div className="mt-12 max-w-2xl space-y-6 text-base text-ink-muted">
        <div className="border-t border-line pt-6">
          <p className="font-display text-lg text-ink">General information, not legal advice</p>
          <p className="mt-2">
            Content on this site, including the Insights section and the Directors&apos;
            Liability Briefing, is general information about the Data Protection Act and related
            compliance topics. It isn&apos;t a substitute for legal advice specific to your
            circumstances, and using this site doesn&apos;t create an advisory or client
            relationship on its own.
          </p>
        </div>

        <div className="border-t border-line pt-6">
          <p className="font-display text-lg text-ink">No guaranteed outcome</p>
          <p className="mt-2">
            COMPLY, GUARD, SHIELD MSP, Cloud Enclave, and our security assessments are structured,
            professional engagements delivered to a defined scope. We don&apos;t guarantee a
            specific regulatory outcome, and no assessment or service can guarantee immunity from
            investigation or enforcement; it substantially reduces exposure by putting real
            compliance and security in place and documenting it properly.
          </p>
        </div>

        <div className="border-t border-line pt-6">
          <p className="font-display text-lg text-ink">Governing law</p>
          <p className="mt-2">
            Engagements with AESURUS Limited are governed by the laws of Jamaica.
          </p>
        </div>

        <div className="border-t border-line pt-6">
          <p className="font-display text-lg text-ink">Questions</p>
          <p className="mt-2">
            If anything here is unclear before you engage us, ask. We&apos;d rather explain the
            terms plainly upfront than have you find out what they mean later.
          </p>
        </div>
      </div>
    </section>
  );
}
