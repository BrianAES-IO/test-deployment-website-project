/**
 * Site-wide contact details and environment-driven configuration.
 * Contact values below are real; env vars override them if set, see
 * .env.example for the full list.
 */

import { services } from "./offers";

export const siteConfig = {
  name: "AESURUS",
  legalName: "AESURUS Limited",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://aesurus.io",
  description:
    "AESURUS makes Jamaican firms defensibly compliant with the Data Protection Act and keeps them secure, for fixed fees.",
  location: {
    locality: "Kingston",
    country: "Jamaica",
  },
  contact: {
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+1 (876) 283-2127",
    whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "18762832127",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@aesurus.io",
  },
  // TODO: set NEXT_PUBLIC_BOOKING_URL to a real Cal.com or Calendly link.
  // When unset, /book renders a mailto + phone fallback instead of an embed.
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  analytics: {
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
    vercelAnalytics: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "true",
  },
  /**
   * Phase A/B switch. The two free assessment tools (Phase B) need Firebase to
   * score, gate, and store submissions. Phase A must build and run with none of
   * that configured, so every assessment entry point checks this flag and
   * renders a graceful "coming this month" fallback when it's false, instead of
   * a broken form. Flip to true automatically the moment Firebase env vars are
   * present; no code change needed here.
   */
  assessmentsLive: Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  /**
   * Master switch for the full cookie-consent banner (granular categories,
   * persisted choice, blocked scripts until consent). Off by default: the site
   * ships with cookieless analytics only, so a banner would be theatre, not
   * disclosure. The banner component is fully built and ready; flip this to
   * true only when a marketing/tracking script is actually added that needs
   * consent, per the brief's consent-manager spec.
   */
  marketingScripts: false,
};

export const whatsappLink = (message?: string) => {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/** Entries for the Services dropdown/panel in the header nav. */
export const serviceNavItems = services.map((s) => ({
  href: s.href,
  label: s.name,
  tagline: s.tagline,
}));

/** Entries for the Free Assessment dropdown/panel in the header nav. */
export const assessmentNavItems = [
  {
    href: "/assessment/dpa",
    label: "DPA Exposure Score",
    tagline: "12 questions on your Data Protection Act exposure, about 3 minutes.",
  },
  {
    href: "/assessment/security",
    label: "Cyber Readiness Check",
    tagline: "10 questions on your technical security posture, about 3 minutes.",
  },
];

export const navLinks = [
  { href: "/insights", label: "Insights" },
  { href: "/briefing", label: "Briefing" },
  { href: "/about", label: "About" },
];

export const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  ...services.map((s) => ({ href: s.href, label: s.name })),
  { href: "/assessment/dpa", label: "DPA Exposure Score" },
  { href: "/assessment/security", label: "Cyber Readiness Check" },
  { href: "/insights", label: "Insights" },
  { href: "/briefing", label: "Directors' Briefing" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book a call" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];
