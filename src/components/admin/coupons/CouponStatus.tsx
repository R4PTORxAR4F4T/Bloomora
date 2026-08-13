"use client";

import { CouponFormData } from "@/src/types/coupon";

interface Props {
  form: CouponFormData;

  updateField: <
    K extends keyof CouponFormData
  >(
    key: K,
    value: CouponFormData[K]
  ) => void;
}

export default function CouponStatus({
  form,
  updateField,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
          Status
        </h2>

      </div>

      <div className="p-6">

        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) =>
              updateField(
                "active",
                e.target.checked
              )
            }
            className="h-5 w-5 rounded"
          />

          <div>

            <p className="font-medium">
              Active Coupon
            </p>

            <p className="text-sm text-gray-500">
              Customers can use this coupon when enabled.
            </p>

          </div>

        </label>

      </div>

    </div>
  );
}