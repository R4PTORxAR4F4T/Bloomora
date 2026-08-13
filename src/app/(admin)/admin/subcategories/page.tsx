"use client";

import SubCategoryTable from "@/src/components/admin/subcategories/SubCategoryTable";

export default function SubCategoriesPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Sub Categories
          </h1>

          <p className="mt-1 text-gray-500">
            Manage all product sub categories.
          </p>

        </div>

      </div>

      <SubCategoryTable />

    </div>
  );
}