"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import { LedgerLabel } from "@/components/Ledger";

const inputClass =
  "mt-1 w-full border border-line bg-white/60 px-4 py-3 text-base text-ink outline-none transition-colors duration-200 ease-brand focus:border-brand";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setResetSent(false);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();

      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) throw new Error("Sign-in failed.");

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Incorrect email or password.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReset() {
    setError(null);
    if (!email) {
      setError('Enter your email above first, then click "Forgot password".');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch {
      setError("Couldn't send a reset email. Check the address and try again.");
    }
  }

  return (
    <section className="border-b border-line bg-schematic">
      <div className="mx-auto max-w-sm px-6 py-20 sm:py-28">
        <LedgerLabel>Admin</LedgerLabel>
        <h1 className="mt-3 text-3xl font-medium text-ink">Sign in.</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-medium text-ink">
            Email
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </label>
          <label className="block text-sm font-medium text-ink">
            Password
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </label>

          {error && <p className="text-sm text-red-700">{error}</p>}
          {resetSent && <p className="text-sm text-ink-muted">Password reset email sent.</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-sm bg-brand px-8 py-4 font-body text-base font-semibold text-paper transition-colors duration-200 ease-brand hover:bg-brand-deep disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="block text-sm font-semibold text-ink-muted transition-colors duration-200 ease-brand hover:text-brand"
          >
            Forgot password?
          </button>
        </form>
      </div>
    </section>
  );
}
