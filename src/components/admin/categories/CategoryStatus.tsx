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

export default function CategoryStatus({
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
            Active Category
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Active categories are visible
            when creating products and on
            the storefront.
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