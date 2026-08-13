"use client";

import { CategoryPerformance as CategoryData } from "@/src/types/dashboard";

interface Props {
  categories: CategoryData[];
}

export default function CategoryPerformance({
  categories,
}: Props) {
  const maxSold = Math.max(
    ...categories.map((c) => c.totalSold),
    1
  );

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Category Performance
      </h2>

      {categories.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          No category data found.
        </div>
      ) : (
        <div className="space-y-5">
          {categories.map((category) => {
            const percentage =
              (category.totalSold / maxSold) *
              100;

            return (
              <div key={category.id}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {category.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {category.totalProducts} Products
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {category.totalSold}
                    </p>

                    <p className="text-xs text-gray-500">
                      Sold
                    </p>
                  </div>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-[#B78A61]"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}