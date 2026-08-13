"use client";

import Link from "next/link";

interface Props {
  loading?: boolean;

  isEdit?: boolean;
}

export default function CouponSubmit({
  loading = false,
  isEdit = false,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="flex items-center justify-end gap-3 p-6">

        <Link
          href="/admin/coupons"
          className="rounded-lg border px-5 py-2 font-medium transition hover:bg-gray-50"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-5 py-2 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : isEdit
            ? "Update Coupon"
            : "Create Coupon"}
        </button>

      </div>

    </div>
  );
}