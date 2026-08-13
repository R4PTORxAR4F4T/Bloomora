"use client";

import { useParams } from "next/navigation";

import CategoryForm from "@/src/components/admin/categories/CategoryForm";

export default function EditCategoryPage() {
  const params = useParams();

  const id = params.id as string;

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Category
        </h1>

        <p className="mt-1 text-gray-500">
          Update category information.
        </p>

      </div>

      <CategoryForm
        editMode
        categoryId={id}
      />

    </div>
  );
}