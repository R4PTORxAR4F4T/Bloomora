"use client";

// import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getProducts } from "@/src/services/product.service";
import Image from "next/image";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="mb-10 text-5xl font-bold">
          Shop
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-xl border"
            >
              <div className="aspect-square bg-gray-200" />

              <div className="space-y-3 p-4">
                <div className="h-5 rounded bg-gray-200" />
                <div className="h-5 w-24 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <h1 className="mb-10 text-5xl font-bold">
        Shop
      </h1>

      {products.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold">
            No products found
          </h2>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product: any,index) => (
            <Link
              key={product._id}
              href={`/shop/${product.slug}`}
              className="group overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={product.images?.[0]?.url || "/images/placeholder.png"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  loading="eager"
                  priority={index === 0}
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="space-y-3 p-5">
                <h2 className="line-clamp-2 text-lg font-semibold">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2">
                  {product.discountPrice > 0 ? (
                    <>
                      <span className="text-xl font-bold text-[#B78A61]">
                        ৳{product.discountPrice}
                      </span>

                      <span className="text-gray-400 line-through">
                        ৳{product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-[#B78A61]">
                      ৳{product.price}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span>
                    ⭐ {product.rating.toFixed(1)}
                  </span>

                  <span
                    className={
                      product.stock > 0
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {product.stock > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}