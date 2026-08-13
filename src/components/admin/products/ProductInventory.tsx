"use client";

import { ProductFormData } from "./ProductForm";

interface Props {
  form: ProductFormData;

  updateField: <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) => void;
}

export default function ProductInventory({
  form,
  updateField,
}: Props) {
  const stockStatus =
    form.stock <= 0
      ? {
          text: "Out of Stock",
          color: "text-red-600 bg-red-50",
        }
      : form.stock <= 5
      ? {
          text: "Low Stock",
          color: "text-yellow-700 bg-yellow-50",
        }
      : {
          text: "In Stock",
          color: "text-green-700 bg-green-50",
        };

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Inventory
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Stock */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Stock Quantity
          </label>

          <input
            type="number"
            min={0}
            value={
              form.stock === 0 ? "" : form.stock
            }
            onChange={(e) =>
              updateField(
                "stock",
                e.target.value === ""
                ? 0
                : Number(e.target.value)
              )
            }
            placeholder="Enter available stock"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          />

          <div
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-medium ${stockStatus.color}`}
          >
            {stockStatus.text}
          </div>
        </div>

      </div>
    </section>
  );
}