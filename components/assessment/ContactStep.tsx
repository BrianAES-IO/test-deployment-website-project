"use client";

import { useState, type FormEvent } from "react";
import { LedgerLabel } from "@/components/Ledger";
import { sectorOptions, companySizeOptions, type AssessmentContact } from "@/config/assessments";

const inputClass =
  "mt-1 w-full border border-line bg-white/60 px-4 py-3 text-base text-ink outline-none transition-colors duration-200 ease-brand focus:border-brand";

export function ContactStep({
  submitting,
  error,
  onBack,
  onSubmit,
}: {
  submitting: boolean;
  error: string | null;
  onBack: () => void;
  onSubmit: (contact: AssessmentContact, consent: boolean, honeypot: string) => void;
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [sector, setSector] = useState(sectorOptions[0]);
  const [companySize, setCompanySize] = useState(companySizeOptions[0]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({ name, company, role, sector, companySize, email, phone }, consent, honeypot);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10">
      <LedgerLabel>Almost done</LedgerLabel>
      <h2 className="mt-3 text-xl font-medium text-ink sm:text-2xl">Where should we send your result?</h2>
      <p className="mt-2 text-sm text-ink-muted">
        We ask for this before showing your score, so we can send it to you and follow up only if you ask us to.
      </p>

      {/* Honeypot: hidden from real visitors, invisible to screen readers via aria-hidden on the
          wrapper, but present in the DOM for basic bots that fill every field. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company-website">Company website</label>
        <input
          id="company-website"
          name="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Name
          <input required className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-ink">
          Company
          <input required className={inputClass} value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-ink">
          Role
          <input required className={inputClass} value={role} onChange={(e) => setRole(e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-ink">
          Sector
          <select required className={inputClass} value={sector} onChange={(e) => setSector(e.target.value)}>
            {sectorOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Company size
          <select
            required
            className={inputClass}
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value)}
          >
            {companySizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Email
          <input
            required
            type="email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-ink sm:col-span-2">
          Phone <span className="font-normal text-ink-muted">(optional)</span>
          <input type="tel" className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm text-ink-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 border-line text-brand focus:ring-brand"
        />
        I&apos;d like AESURUS to follow up about services relevant to my result.
      </label>

      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-block rounded-sm bg-brand px-8 py-4 font-body text-base font-semibold text-paper transition-colors duration-200 ease-brand hover:bg-brand-deep disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "See my result"}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold text-ink-muted transition-colors duration-200 ease-brand hover:text-brand"
        >
          &larr; Back
        </button>
      </div>
    </form>
  );
}
