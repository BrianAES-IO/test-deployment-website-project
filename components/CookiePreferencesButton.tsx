"use client";

/** Only rendered when siteConfig.marketingScripts is true; reopens the full consent banner. */
export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("aesurus:reopen-consent"))}
      className="link-underline text-sm text-paper/70 hover:text-brand-light"
    >
      Cookie preferences
    </button>
  );
}
