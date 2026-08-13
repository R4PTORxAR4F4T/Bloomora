"use client";

import SubCategoryForm from "@/src/components/admin/subcategories/SubCategoryForm";

export default function CreateSubCategoryPage() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Create Sub Category
        </h1>

        <p className="mt-1 text-gray-500">
          Add a new product sub category.
        </p>

      </div>

      <SubCategoryForm />

    </div>
  );
}