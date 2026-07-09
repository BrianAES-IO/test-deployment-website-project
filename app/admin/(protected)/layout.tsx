import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-session";
import { LogoutButton } from "@/components/admin/LogoutButton";

// Uses cookies() via requireAdminSession, so this must never be statically
// generated: every request has to be checked against a live session.
export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/admin" className="font-display text-lg font-medium text-ink">
            AESURUS Admin
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/admin"
              className="text-sm font-semibold text-ink-muted transition-colors duration-200 ease-brand hover:text-brand"
            >
              Submissions
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
