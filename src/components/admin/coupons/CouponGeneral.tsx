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

export default function CouponGeneral({
  form,
  updateField,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
          Coupon Information
        </h2>

      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Coupon Code
          </label>

          <input
            value={form.code}
            onChange={(e) =>
              updateField(
                "code",
                e.target.value.toUpperCase()
              )
            }
            className="w-full rounded-lg border px-4 py-2"
            placeholder="SUMMER25"
            required
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Discount Type
          </label>

          <select
            value={form.discountType}
            onChange={(e) =>
              updateField(
                "discountType",
                e.target.value as
                  | "percentage"
                  | "fixed"
              )
            }
            className="w-full rounded-lg border px-4 py-2"
          >

            <option value="percentage">
              Percentage
            </option>

            <option value="fixed">
              Fixed Amount
            </option>

          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Discount Value
          </label>

          <input
            type="number"
            min={0}
            value={form.discountValue == 0 ? "" : form.discountValue}
            onChange={(e) =>
              updateField(
                "discountValue",
                e.target.value === ""
                  ? 0
                  : Number(e.target.value)
              )
            }
            placeholder="10% or $10"
            className="w-full rounded-lg border px-4 py-2"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Minimum Order
          </label>

          <input
            type="number"
            min={0}
            value={form.minimumOrder == 0 ? "" : form.minimumOrder}
            onChange={(e) =>
              updateField(
                "minimumOrder",
                e.target.value === ""
                  ? 0
                  : Number(e.target.value)
              )
            }
            placeholder="$3000"
            className="w-full rounded-lg border px-4 py-2"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Maximum Discount
          </label>

          <input
            type="number"
            min={0}
            value={form.maximumDiscount == 0 ? "" : form.maximumDiscount}
            onChange={(e) =>
              updateField(
                "maximumDiscount",
                e.target.value === ""
                  ? 0
                  : Number(e.target.value)
              )
            }
            placeholder="$300"
            className="w-full rounded-lg border px-4 py-2"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Usage Limit
          </label>

          <input
            type="number"
            min={0}
            value={form.usageLimit == 0 ? "" : form.usageLimit}
            onChange={(e) =>
              updateField(
                "usageLimit",
                e.target.value === ""
                  ? 0
                  : Number(e.target.value)
              )
            }
            placeholder="Number of times this coupon can be used"
            className="w-full rounded-lg border px-4 py-2"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Start Date
          </label>

          <input
            type="date"
            value={form.startDate}
            onChange={(e) =>
              updateField(
                "startDate",
                e.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-2"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            End Date
          </label>

          <input
            type="date"
            value={form.endDate}
            onChange={(e) =>
              updateField(
                "endDate",
                e.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-2"
          />

        </div>

        <div className="md:col-span-2">

          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            rows={4}
            value={form.description}
            onChange={(e) =>
              updateField(
                "description",
                e.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-2"
            placeholder="Optional description..."
          />

        </div>

      </div>

    </div>
  );
}