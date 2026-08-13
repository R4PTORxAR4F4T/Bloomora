"use client";

import CategoryTable from "@/src/components/admin/categories/CategoryTable";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="mt-1 text-gray-500">
            Manage all product categories.
          </p>

        </div>

      </div>

      <CategoryTable />

    </div>
  );
}