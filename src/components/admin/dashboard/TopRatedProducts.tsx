"use client";

import Image from "next/image";

import { ProductSummary } from "@/src/types/dashboard";

interface Props {
  products: ProductSummary[];
}

export default function TopRatedProducts({
  products,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Top Rated Products
      </h2>

      {products.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          No rated products found.
        </div>
      ) : (
        <div className="space-y-5">
          {products.map((product) => {
            const image =
              product.images?.[0]?.url ??
              "/images/collections/default-placeholder.png";

            return (
              <div
                key={product._id ?? product.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={image}
                    alt={product.name}
                    width={60}
                    height={60}
                    loading="eager"
                    className="h-[60px] w-[60px] rounded-lg border object-cover"
                  />

                  <div>
                    <h3 className="font-medium">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {product.totalReviews ?? 0} Reviews
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-yellow-500">
                    ⭐ {(product.rating ?? 0).toFixed(1)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}