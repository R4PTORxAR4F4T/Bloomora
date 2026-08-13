"use client";

import { SubCategoryFormData } from "./SubCategoryForm";

interface Category {
  _id: string;

  name: string;
}

interface Props {
  form: SubCategoryFormData;

  categories: Category[];

  updateField: <
    K extends keyof SubCategoryFormData
  >(
    key: K,
    value: SubCategoryFormData[K]
  ) => void;
}

export default function SubCategoryGeneral({
  form,
  categories,
  updateField,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        General Information
      </h2>

      <div className="space-y-5">

        {/* Category */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            value={form.category}
            onChange={(e) =>
              updateField(
                "category",
                e.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-2 outline-none transition focus:border-black"
          >
            <option value="">
              Select Category
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              )
            )}
          </select>

        </div>

        {/* Sub Category Name */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Sub Category Name
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
            placeholder="Necklace"
            className="w-full rounded-lg border px-4 py-2 outline-none transition focus:border-black"
          />

        </div>

        {/* SKU Prefix */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            SKU Prefix
          </label>

          <input
            type="text"
            value={form.skuPrefix}
            onChange={(e) =>
              updateField(
                "skuPrefix",
                e.target.value.toUpperCase()
              )
            }
            placeholder="NK"
            className="w-full rounded-lg border px-4 py-2 uppercase outline-none transition focus:border-black"
          />

          <p className="mt-2 text-xs text-gray-500">
            Example: <strong>NK</strong>
            {" "}will generate{" "}
            <strong>NK-0001</strong>,
            <strong>NK-0002</strong>,
            etc.
          </p>

        </div>

      </div>

    </section>
  );
}