"use client";

import { CategoryFormData } from "./CategoryForm";

interface Props {
  form: CategoryFormData;

  updateField: <
    K extends keyof CategoryFormData
  >(
    key: K,
    value: CategoryFormData[K]
  ) => void;
}

export default function CategoryGeneral({
  form,
  updateField,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        General Information
      </h2>

      <div className="space-y-5">

        {/* Category Name */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category Name
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
            placeholder="Jewelry"
            className="w-full rounded-lg border px-4 py-2 outline-none transition focus:border-black"
          />
        </div>

        {/* Description */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            rows={5}
            value={form.description}
            onChange={(e) =>
              updateField(
                "description",
                e.target.value
              )
            }
            placeholder="Write a short description for this category..."
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-black"
          />
        </div>

      </div>

    </section>
  );
}