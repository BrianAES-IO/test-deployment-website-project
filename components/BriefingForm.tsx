"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function BriefingForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Registration failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-white/40 p-8 text-center">
        <p className="font-display text-xl text-ink">You&apos;re registered.</p>
        <p className="mt-2 text-base text-ink-muted">
          We&apos;ll send the call details to your email before the session.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line bg-white/40 p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full border border-line bg-paper px-4 py-3 text-ink transition-colors duration-200 ease-brand focus:border-brand focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="firm" className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Firm
          </label>
          <input
            id="firm"
            name="firm"
            type="text"
            required
            className="mt-2 w-full border border-line bg-paper px-4 py-3 text-ink transition-colors duration-200 ease-brand focus:border-brand focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            required
            placeholder="Managing Director, Partner..."
            className="mt-2 w-full border border-line bg-paper px-4 py-3 text-ink transition-colors duration-200 ease-brand placeholder:text-ink-muted/60 focus:border-brand focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full border border-line bg-paper px-4 py-3 text-ink transition-colors duration-200 ease-brand focus:border-brand focus:outline-none"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-2 w-full border border-line bg-paper px-4 py-3 text-ink transition-colors duration-200 ease-brand focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-700">
          Something went wrong submitting that. Please try again, or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-sm bg-brand px-6 py-4 font-body text-base font-semibold text-paper transition-colors duration-200 ease-brand hover:bg-brand-deep disabled:opacity-60"
      >
        {status === "submitting" ? "Registering…" : "Reserve my seat"}
      </button>
    </form>
  );
}
