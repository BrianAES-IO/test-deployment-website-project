import type { Metadata } from "next";
import { Ledger, LedgerLabel, LedgerRow } from "@/components/Ledger";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How AESURUS collects, uses, and protects data submitted through aesurus.io.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <LedgerLabel>Privacy Notice</LedgerLabel>
      <h1 className="mt-3 text-4xl font-medium text-ink">How we handle your data on this site.</h1>
      <p className="mt-6 max-w-2xl text-lg italic text-ink-muted">
        This notice is written the way we write them for clients, in plain English.
      </p>

      <div className="mt-10 max-w-2xl space-y-4 text-base text-ink-muted">
        <p>
          This page covers aesurus.io itself: what we collect when you visit or use this site,
          why, how long we keep it, and what you can do about it. It doesn&apos;t cover data we
          process on behalf of clients under a separate engagement; that&apos;s governed by the
          terms of that engagement.
        </p>
      </div>

      <Ledger className="mt-12">
        <LedgerRow index={1}>
          <p className="font-display text-lg text-ink">Form submissions</p>
          <p className="mt-2 max-w-2xl text-base text-ink-muted">
            If you register for the Directors&apos; Liability Briefing, we collect your name,
            firm, role, email address, and, if you provide it, phone number. We use this only to
            send you session details and any directly related follow-up. We don&apos;t sell it,
            rent it, or use it for unrelated marketing.
          </p>
        </LedgerRow>

        <LedgerRow index={2}>
          <p className="font-display text-lg text-ink">The free assessment tools</p>
          <p className="mt-2 max-w-2xl text-base text-ink-muted">
            The DPA Exposure Score and Cyber Readiness Check ask a set of self-reported questions
            about your organization, then ask for your name, company, role, sector, company size,
            email, and phone number before showing your score. We collect this to calculate and
            send you the result, and to follow up about services relevant to what the assessment
            shows. Submission requires your explicit, unticked consent to that follow-up; we
            don&apos;t assume it. Your answers and score are indicative and self-reported; we treat
            them as sensitive (they describe your organization&apos;s compliance and security
            gaps) and restrict internal access accordingly.
          </p>
        </LedgerRow>

        <LedgerRow index={3}>
          <p className="font-display text-lg text-ink">Booking a call</p>
          <p className="mt-2 max-w-2xl text-base text-ink-muted">
            When you book a call through this site, you&apos;re taken to (or shown an embed of) a
            third-party scheduling tool. That tool collects the details you enter, typically name,
            email, and the time you selected, under its own privacy policy, not ours. We recommend
            reading it before you book if that matters to you. We receive the booking details
            necessary to have the call with you.
          </p>
        </LedgerRow>

        <LedgerRow index={4}>
          <p className="font-display text-lg text-ink">Cookies and analytics</p>
          <p className="mt-2 max-w-2xl text-base text-ink-muted">
            This site sets no tracking or advertising cookies. It may use Plausible Analytics
            and/or Vercel Analytics, both cookieless and unable to track you across other
            websites. If enabled, they record aggregate, anonymised information (page views,
            referring sites, device type), never anything that identifies you personally. The only
            cookies this site sets are strictly necessary ones, for example keeping you signed in
            to the admin portal, or basic security protections, and those apply regardless of any
            cookie choice, because they don&apos;t involve tracking or profiling. If that ever
            changes and we add a script that does track you, a proper consent banner (equal
            Accept/Decline, nothing pre-ticked) will appear before it loads, and a &quot;Cookie
            preferences&quot; link will let you change your mind at any time.
          </p>
        </LedgerRow>

        <LedgerRow index={5}>
          <p className="font-display text-lg text-ink">How long we keep it</p>
          <p className="mt-2 max-w-2xl text-base text-ink-muted">
            Briefing registrations are kept only as long as needed to organise the session and any
            immediate follow-up, then deleted or archived. Assessment submissions (your answers,
            score, and contact details) are kept for 12 months from submission and then deleted,
            unless you&apos;ve become a client, in which case your engagement records are kept
            under the terms of that engagement instead. If you ask us to delete your information
            sooner, we will, unless we&apos;re required to keep it for a legitimate reason (for
            example, an active registration you haven&apos;t yet attended).
          </p>
        </LedgerRow>

        <LedgerRow index={6}>
          <p className="font-display text-lg text-ink">Your rights</p>
          <p className="mt-2 max-w-2xl text-base text-ink-muted">
            You can ask us what information we hold about you, ask us to correct it, or ask us to
            delete it. Email us and we&apos;ll respond directly: no portal, no ticket number, no
            runaround.
          </p>
        </LedgerRow>

        <LedgerRow index={7}>
          <p className="font-display text-lg text-ink">Contact</p>
          <p className="mt-2 max-w-2xl text-base text-ink-muted">
            Questions about this notice, or about data you&apos;ve submitted through this site,
            can go to{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="link-underline font-semibold text-brand">
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </LedgerRow>
      </Ledger>
    </section>
  );
}
