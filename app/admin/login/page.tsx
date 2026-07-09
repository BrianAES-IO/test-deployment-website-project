import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { LedgerLabel } from "@/components/Ledger";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  // Same Phase A/B gate as the assessment routes: never mount AdminLoginForm
  // (which imports the Firebase client SDK) unless Firebase is configured.
  // getAuth() validates its API key eagerly, so importing it with no key set
  // throws in the browser rather than failing gracefully on first use.
  if (!siteConfig.assessmentsLive) {
    return (
      <section className="border-b border-line bg-schematic">
        <div className="mx-auto max-w-sm px-6 py-20 sm:py-28">
          <LedgerLabel>Admin</LedgerLabel>
          <h1 className="mt-3 text-3xl font-medium text-ink">Not configured yet.</h1>
          <p className="mt-4 text-base text-ink-muted">
            The admin portal isn&apos;t set up on this deployment yet.
          </p>
        </div>
      </section>
    );
  }

  return <AdminLoginForm />;
}
