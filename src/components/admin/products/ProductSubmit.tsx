"use client";

import Link from "next/link";

interface Props {
  loading?: boolean;

  editMode?: boolean;

  onCancel?: () => void;
}

export default function ProductSubmit({
  loading = false,
  editMode = false,
  onCancel,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="text-sm text-gray-500">
          Make sure all required information has been filled before saving.
        </div>

        <div className="flex gap-3">

          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-300 px-5 py-2 transition hover:bg-gray-100"
            >
              Cancel
            </button>
          ) : (
            <Link
              href="/admin/products"
              className="rounded-lg border border-gray-300 px-5 py-2 transition hover:bg-gray-100"
            >
              Cancel
            </Link>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-black px-6 py-2 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading
              ? editMode
                ? "Updating..."
                : "Creating..."
              : editMode
              ? "Update Product"
              : "Create Product"}
          </button>

        </div>

      </div>

    </section>
  );
}