"use client";

import Link from "next/link";

interface Props {
  loading: boolean;
  editMode: boolean;
}

export default function CategorySubmit({
  loading,
  editMode,
}: Props) {
  return (
    <section className="sticky bottom-0 rounded-xl border bg-white p-6 shadow-lg">

      <div className="flex items-center justify-end gap-4">

        <Link
          href="/admin/categories"
          className="rounded-lg border px-6 py-2.5 transition hover:bg-gray-100"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-6 py-2.5 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : editMode
            ? "Update Category"
            : "Create Category"}
        </button>

      </div>

    </section>
  );
}