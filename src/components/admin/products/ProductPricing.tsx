"use client";

import { ProductFormData } from "./ProductForm";

interface Props {
  form: ProductFormData;

  updateField: <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) => void;
}

export default function ProductPricing({
  form,
  updateField,
}: Props) {
  const discount =
    form.discountPrice > 0 &&
    form.discountPrice < form.price
      ? Math.round(
          ((form.price - form.discountPrice) /
            form.price) *
            100
        )
      : 0;

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Pricing
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Price */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Regular Price
          </label>

          <input
            type="number"
            min={0}
            value={form.price === 0 ? "" : form.price}
            onChange={(e) =>
              updateField(
                "price",
                e.target.value === ""
                  ? 0
                  : Number(e.target.value)
              )
            }
            placeholder="$100"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          />
        </div>

        {/* Discount Price */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Discount Price
          </label>

          <input
            type="number"
            min={0}
            value={
              form.discountPrice === 0
                ? ""
                : form.discountPrice
            }
            onChange={(e) =>
              updateField(
                "discountPrice",
                e.target.value === ""
                  ? 0
                  : Number(e.target.value)
              )
            }
            placeholder="$10"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          />
        </div>

      </div>

      {discount > 0 && (
        <div className="mt-5 rounded-lg bg-green-50 p-4 text-sm text-green-700">
          Customer saves <strong>{discount}%</strong>
        </div>
      )}
    </section>
  );
}