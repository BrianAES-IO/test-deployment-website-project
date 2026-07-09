/**
 * Consent storage helpers. Two independent things are tracked here:
 *
 * 1. Dismissal of the "no tracking cookies" footer notice (shown when
 *    siteConfig.marketingScripts is false, the current, default state).
 * 2. The actual granular consent choice (necessary/analytics/marketing),
 *    used only once siteConfig.marketingScripts is flipped to true and a
 *    real consent banner is required.
 *
 * If a marketing/tracking script is ever added, gate its loading behind
 * `getConsent()?.marketing`, don't load it unconditionally.
 */

export type ConsentChoice = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = "aesurus-consent";
const NOTICE_DISMISSED_KEY = "aesurus-notice-dismissed";

export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(CONSENT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ConsentChoice;
  } catch {
    return null;
  }
}

export function setConsent(choice: Omit<ConsentChoice, "necessary">) {
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ necessary: true, ...choice }));
}

export function clearConsent() {
  window.localStorage.removeItem(CONSENT_KEY);
}

export function isNoticeDismissed(): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(NOTICE_DISMISSED_KEY) === "1";
}

export function dismissNotice() {
  window.localStorage.setItem(NOTICE_DISMISSED_KEY, "1");
}
