"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SubmissionActions({ id, status, notes }: { id: string; status: string; notes: string }) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentNotes, setCurrentNotes] = useState(notes);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: currentStatus, notes: currentNotes }),
      });
      if (!response.ok) throw new Error();
      router.refresh();
    } catch {
      setError("Couldn't save. Try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error();
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Couldn't delete. Try again.");
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-4 border-t border-line pt-6">
      <label className="block text-sm font-medium text-ink">
        Status
        <select
          value={currentStatus}
          onChange={(e) => setCurrentStatus(e.target.value)}
          className="mt-1 w-full border border-line bg-white/60 px-4 py-3 text-base text-ink outline-none transition-colors duration-200 ease-brand focus:border-brand"
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
        </select>
      </label>

      <label className="block text-sm font-medium text-ink">
        Notes
        <textarea
          rows={4}
          value={currentNotes}
          onChange={(e) => setCurrentNotes(e.target.value)}
          className="mt-1 w-full border border-line bg-white/60 px-4 py-3 text-base text-ink outline-none transition-colors duration-200 ease-brand focus:border-brand"
        />
      </label>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-sm bg-brand px-6 py-3 text-sm font-semibold text-paper transition-colors duration-200 ease-brand hover:bg-brand-deep disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="text-sm font-semibold text-red-700 transition-colors duration-200 ease-brand hover:text-red-900"
        >
          {deleting ? "Deleting..." : confirmDelete ? "Click again to confirm delete" : "Delete submission"}
        </button>
      </div>
    </div>
  );
}
