"use client";

import { ProductFormData } from "./ProductForm";

interface Category {
  _id: string;
  name: string;
}

interface SubCategory {
  _id: string;
  name: string;
  category: string;
}

interface Props {
  form: ProductFormData;

  categories: Category[];

  subCategories: SubCategory[];

  updateField: <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) => void;
}

export default function ProductCategory({
  form,
  categories,
  subCategories,
  updateField,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Category
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            value={form.category}
            onChange={(e) => {
              updateField(
                "category",
                e.target.value
              );

              updateField(
                "subCategory",
                ""
              );
            }}
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Sub Category
          </label>

          <select
            value={form.subCategory}
            onChange={(e) =>
              updateField(
                "subCategory",
                e.target.value
              )
            }
            disabled={!form.category}
            className="w-full rounded-lg border px-4 py-2 outline-none disabled:bg-gray-100"
          >
            <option value="">
              Select Sub Category
            </option>

            {subCategories.map(
              (subCategory) => (
                <option
                  key={subCategory._id}
                  value={subCategory._id}
                >
                  {subCategory.name}
                </option>
              )
            )}
          </select>
        </div>

      </div>
    </section>
  );
}

