"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { navLinks, serviceNavItems, assessmentNavItems } from "@/config/site";
import { EASE } from "@/lib/motion";

type NavItem = { href: string; label: string; tagline: string };

function NavDropdown({
  label,
  items,
  viewAllHref,
  viewAllLabel,
  onNavigate,
}: {
  label: string;
  items: NavItem[];
  viewAllHref?: string;
  viewAllLabel?: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="link-underline font-body text-sm font-medium text-ink-muted hover:text-brand"
      >
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: EASE }}
            className="absolute left-1/2 top-full w-96 -translate-x-1/2 border border-line bg-paper p-2 shadow-lg"
          >
            {viewAllHref && (
              <Link
                href={viewAllHref}
                onClick={onNavigate}
                className="block border-b border-line px-4 py-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-brand hover:bg-surface"
              >
                {viewAllLabel} &rarr;
              </Link>
            )}
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="block px-4 py-3 transition-colors duration-150 ease-brand hover:bg-surface"
              >
                <span className="block font-body text-sm font-semibold text-ink">{item.label}</span>
                <span className="block text-sm text-ink-muted">{item.tagline}</span>
              </Link>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAll = () => setMobileOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ease-brand ${
        scrolled
          ? "border-b border-line bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent bg-paper"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={closeAll} className="shrink-0">
          <Image src="/logo-blue.png" alt="AESURUS" width={164} height={36} priority className="h-9 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavDropdown
            label="Services"
            items={serviceNavItems}
            viewAllHref="/services"
            viewAllLabel="All services"
            onNavigate={closeAll}
          />
          <NavDropdown
            label="Free Assessment"
            items={assessmentNavItems}
            onNavigate={closeAll}
          />

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline font-body text-sm font-medium text-ink-muted hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/book"
            className="inline-block rounded-sm bg-brand px-5 py-2.5 font-body text-sm font-semibold text-paper transition-colors duration-200 ease-brand hover:bg-brand-deep"
          >
            Book a call
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform duration-200 ease-brand ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-opacity duration-200 ease-brand ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform duration-200 ease-brand ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <m.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE }}
            className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-paper md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              <li className="border-b border-line py-2">
                <span className="block py-2 font-mono text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
                  Services
                </span>
                <ul>
                  {serviceNavItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        className="block py-3 font-body text-lg font-medium text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="border-b border-line py-2">
                <span className="block py-2 font-mono text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
                  Free Assessment
                </span>
                <ul>
                  {assessmentNavItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        className="block py-3 font-body text-lg font-medium text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {navLinks.map((link) => (
                <li key={link.href} className="border-b border-line">
                  <Link
                    href={link.href}
                    onClick={closeAll}
                    className="block py-4 font-body text-lg font-medium text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-6">
                <Link
                  href="/book"
                  onClick={closeAll}
                  className="block rounded-sm bg-brand px-6 py-4 text-center font-body text-base font-semibold text-paper"
                >
                  Book a call
                </Link>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
