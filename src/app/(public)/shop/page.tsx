"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";

import { getProducts } from "@/src/services/product.service";
import categoryService from "@/src/services/category.service";
import ProductCard from "@/src/components/product/ProductCard";
import { Product } from "@/src/types/product";
import { Category } from "@/src/types/category";

const SORT_OPTIONS = [
  { value: "", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "popular", label: "Best Selling" },
  { value: "rating", label: "Top Rated" },
];

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || undefined;
  const subCategory = searchParams.get("subCategory") || undefined;
  const search = searchParams.get("search") || undefined;
  const sort = searchParams.get("sort") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await categoryService.getCategories();
        setCategories(
          (data || []).filter((c: Category) => c.active !== false)
        );
      } catch (error) {
        console.error(error);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      try {
        const res = await getProducts({
          category,
          subCategory,
          search,
          sort: sort || undefined,
        });

        setProducts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [category, subCategory, search, sort]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Changing category invalidates any subCategory filter that was
    // scoped to the previous category.
    if (key === "category") {
      params.delete("subCategory");
    }

    router.push(`/shop?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/shop");
  }

  const hasActiveFilters = !!(category || subCategory || search);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <h1 className="text-5xl font-bold">Shop</h1>

        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={16}
            className="hidden text-gray-400 sm:block"
          />

          <select
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="rounded-lg border bg-white px-4 py-2.5 text-sm font-medium focus:border-[#B78A61] focus:outline-none"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <button
            onClick={() => updateParam("category", "")}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              !category
                ? "border-[#B78A61] bg-[#B78A61] text-white"
                : "border-gray-200 text-gray-600 hover:border-[#B78A61] hover:text-[#B78A61]"
            }`}
          >
            All
          </button>

          {categories.map((c) => (
            <button
              key={c._id}
              onClick={() => updateParam("category", c._id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                category === c._id
                  ? "border-[#B78A61] bg-[#B78A61] text-white"
                  : "border-gray-200 text-gray-600 hover:border-[#B78A61] hover:text-[#B78A61]"
              }`}
            >
              {c.name}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-1 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-red-600"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>
      )}

      {loading ? (
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
      ) : products.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold">
            No products found
          </h2>

          <p className="mt-2 text-gray-500">
            Try a different category or clearing your filters.
          </p>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-6 rounded-lg bg-[#B78A61] px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              priority={index === 0}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <Suspense fallback={null}>
        <ShopContent />
      </Suspense>
    </main>
  );
}
