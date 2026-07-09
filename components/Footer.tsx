import Link from "next/link";
import { footerLinks, siteConfig } from "@/config/site";
import { CookiePreferencesButton } from "./CookiePreferencesButton";

export function Footer() {
  return (
    <footer className="bg-footer">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            {/*
              /public/logo-blue.png (the color lockup) is live in the header, where its navy
              wordmark reads fine on the light paper background. This footer band is near-black,
              and that navy text would be nearly illegible on it, so this stays a plain paper-
              colored text wordmark until a white-knockout variant of the logo exists.
            */}
            <p className="font-display text-lg font-semibold text-paper">AESURUS</p>
            <p className="mt-2 max-w-xs text-sm text-paper/60">
              {siteConfig.location.locality}, {siteConfig.location.country}
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-paper/40">
              Secure. Scale. Succeed.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-paper/70 hover:text-brand-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-paper/10 pt-6 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <p className="flex flex-wrap items-center gap-x-2">
            <a href={`mailto:${siteConfig.contact.email}`} className="link-underline hover:text-brand-light">
              {siteConfig.contact.email}
            </a>
            <span>·</span>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="link-underline hover:text-brand-light"
            >
              {siteConfig.contact.phone}
            </a>
            {siteConfig.marketingScripts && (
              <>
                <span>·</span>
                <CookiePreferencesButton />
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
