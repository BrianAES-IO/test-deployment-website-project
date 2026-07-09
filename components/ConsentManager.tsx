"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { dismissNotice, isNoticeDismissed, setConsent, getConsent } from "@/lib/consent";

/**
 * Two mutually exclusive modes, switched by siteConfig.marketingScripts:
 *
 * - false (default, current state): no cookie banner. A single dismissible
 *   footer notice explains that the site is cookieless-by-design. This is
 *   accurate today because analytics here is cookieless (Plausible/Vercel
 *   Analytics) and nothing else sets a cookie beyond strictly-necessary
 *   session/security ones.
 * - true: a full consent banner with equal-prominence Accept/Decline,
 *   granular categories, no pre-ticked boxes, and a persisted choice. Built
 *   fully now so flipping the flag is the only step needed later; do not
 *   wire a marketing script without setting this to true first.
 */
export function ConsentManager() {
  const [mounted, setMounted] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (siteConfig.marketingScripts) {
      setShowBanner(!getConsent());
    } else {
      setShowNotice(!isNoticeDismissed());
    }

    const reopen = () => setShowBanner(true);
    window.addEventListener("aesurus:reopen-consent", reopen);
    return () => window.removeEventListener("aesurus:reopen-consent", reopen);
  }, []);

  if (!mounted) return null;

  if (siteConfig.marketingScripts) {
    if (!showBanner) return null;
    return (
      <div
        role="dialog"
        aria-label="Cookie preferences"
        className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-paper p-6 shadow-lg"
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-ink">
            We use cookies for necessary site function and, if you allow it, analytics and
            marketing. Choose below: necessary cookies always apply so the site works.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex items-center gap-2 text-sm text-ink-muted">
              <input type="checkbox" checked disabled className="h-4 w-4" />
              Necessary (always on)
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-muted">
              <input
                type="checkbox"
                checked={analyticsChecked}
                onChange={(e) => setAnalyticsChecked(e.target.checked)}
                className="h-4 w-4"
              />
              Analytics
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-muted">
              <input
                type="checkbox"
                checked={marketingChecked}
                onChange={(e) => setMarketingChecked(e.target.checked)}
                className="h-4 w-4"
              />
              Marketing
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setConsent({ analytics: true, marketing: true });
                setShowBanner(false);
              }}
              className="rounded-sm bg-brand px-5 py-2.5 text-sm font-semibold text-paper transition-colors duration-200 ease-brand hover:bg-brand-deep"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={() => {
                setConsent({ analytics: analyticsChecked, marketing: marketingChecked });
                setShowBanner(false);
              }}
              className="rounded-sm border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 ease-brand hover:bg-ink hover:text-paper"
            >
              Save choices
            </button>
            <button
              type="button"
              onClick={() => {
                setConsent({ analytics: false, marketing: false });
                setShowBanner(false);
              }}
              className="link-underline text-sm font-medium text-ink-muted"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!showNotice) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-surface px-6 py-3 text-sm text-ink-muted">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
        <p>
          This site sets no tracking cookies, only what&apos;s strictly necessary to work.
          That&apos;s what data minimisation looks like.{" "}
          <Link href="/privacy" className="link-underline font-semibold text-ink">
            Read our privacy notice
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            dismissNotice();
            setShowNotice(false);
          }}
          aria-label="Dismiss"
          className="shrink-0 text-ink-muted hover:text-ink"
        >
          &#10005;
        </button>
      </div>
    </div>
  );
}
