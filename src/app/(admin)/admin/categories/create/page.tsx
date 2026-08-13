"use client";

import { useRouter } from "next/navigation";

import CategoryForm from "@/src/components/admin/categories/CategoryForm";

export default function CreateCategoryPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Create Category
        </h1>

        <p className="mt-1 text-gray-500">
          Add a new product category.
        </p>

      </div>

      <CategoryForm />

    </div>
  );
}