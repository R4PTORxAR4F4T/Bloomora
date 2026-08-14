"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getBestSellerProducts } from "@/src/services/product.service";
import ProductCard from "@/src/components/product/ProductCard";
import { Product } from "@/src/types/product";

export default function BestSeller() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await getBestSellerProducts();
        setProducts(res.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#FBF7F2] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-sm uppercase tracking-[5px] text-[#C49A6C]">
              Customer Favourites
            </span>

            <h2 className="mt-4 text-4xl font-light text-[#3D2A22] md:text-5xl">
              Best Sellers
            </h2>
          </div>

          <Link
            href="/shop?sort=popular"
            className="inline-flex items-center gap-2 font-medium text-[#B68663] transition hover:gap-4"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-xl border bg-white"
              >
                <div className="aspect-square bg-gray-200" />

                <div className="space-y-3 p-4">
                  <div className="h-5 rounded bg-gray-200" />
                  <div className="h-5 w-24 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                priority={index === 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
