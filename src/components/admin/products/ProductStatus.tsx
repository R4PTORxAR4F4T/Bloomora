"use client";

import { ProductFormData } from "./ProductForm";

interface Props {
  form: ProductFormData;

  updateField: <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) => void;
}

interface ToggleProps {
  label: string;

  description: string;

  checked: boolean;

  onChange: (checked: boolean) => void;
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: ToggleProps) {
  return (
    <label className="flex cursor-pointer items-start justify-between rounded-xl border p-4 transition hover:border-black">

      <div>

        <h3 className="font-medium">
          {label}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>

      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChange(e.target.checked)
        }
        className="mt-1 h-5 w-5 accent-black"
      />

    </label>
  );
}

export default function ProductStatus({
  form,
  updateField,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Product Status
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        <Toggle
          label="Featured Product"
          description="Show this product in the featured collection."
          checked={form.featured}
          onChange={(value) =>
            updateField(
              "featured",
              value
            )
          }
        />

        <Toggle
          label="Best Seller"
          description="Display this product in the Best Seller section."
          checked={form.bestSeller}
          onChange={(value) =>
            updateField(
              "bestSeller",
              value
            )
          }
        />

        <Toggle
          label="New Arrival"
          description="Mark this product as a new arrival."
          checked={form.newArrival}
          onChange={(value) =>
            updateField(
              "newArrival",
              value
            )
          }
        />

        <Toggle
          label="Active"
          description="Inactive products are hidden from customers."
          checked={form.active}
          onChange={(value) =>
            updateField(
              "active",
              value
            )
          }
        />

      </div>

    </section>
  );
}