"use client";

import { Coupon } from "@/src/types/coupon";

interface Props {
  coupon: Coupon | null;

  loading?: boolean;

  onClose: () => void;

  onConfirm: () => void;
}

export default function DeleteCouponModal({
  coupon,
  loading = false,
  onClose,
  onConfirm,
}: Props) {
  if (!coupon) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

        <div className="border-b px-6 py-4">

          <h2 className="text-lg font-semibold text-red-600">
            Delete Coupon
          </h2>

        </div>

        <div className="space-y-3 p-6">

          <p>
            Are you sure you want to delete
            this coupon?
          </p>

          <div className="rounded-lg bg-gray-100 p-4">

            <div className="font-semibold">
              {coupon.code}
            </div>

            <div className="text-sm text-gray-500">
              {coupon.description || "No description"}
            </div>

          </div>

          <p className="text-sm text-red-600">
            This action cannot be undone.
          </p>

        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-white disabled:opacity-50"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}