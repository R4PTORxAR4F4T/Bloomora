"use client";

import { SubCategoryFormData } from "./SubCategoryForm";

interface Props {
  form: SubCategoryFormData;

  updateField: <
    K extends keyof SubCategoryFormData
  >(
    key: K,
    value: SubCategoryFormData[K]
  ) => void;
}

export default function SubCategoryStatus({
  form,
  updateField,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Status
      </h2>

      <div className="flex items-center justify-between rounded-lg border p-4">

        <div>

          <h3 className="font-medium">
            Active Sub Category
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Active sub categories are available
            when creating products.
          </p>

        </div>

        <button
          type="button"
          onClick={() =>
            updateField(
              "active",
              !form.active
            )
          }
          className={`relative h-7 w-14 rounded-full transition ${
            form.active
              ? "bg-green-500"
              : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
              form.active
                ? "left-8"
                : "left-1"
            }`}
          />
        </button>

      </div>

    </section>
  );
}