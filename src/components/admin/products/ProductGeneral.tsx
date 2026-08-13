"use client";

import { ProductFormData } from "./ProductForm";

interface Props {
  form: ProductFormData;

  updateField: <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) => void;
}

export default function ProductGeneral({
  form,
  updateField,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        General Information
      </h2>

      <div className="space-y-5">

        {/* Product Name */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Name
          </label>

          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              updateField(
                "name",
                e.target.value
              )
            }
            placeholder="Elegant Pearl Necklace"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          />
        </div>

        {/* Description */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            rows={6}
            value={form.description}
            onChange={(e) =>
              updateField(
                "description",
                e.target.value
              )
            }
            placeholder="Write product description..."
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
          />
        </div>

      </div>
    </section>
  );
}