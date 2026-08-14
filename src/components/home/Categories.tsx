"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Flower2,
  Gem,
  Sparkles,
  Crown,
  LucideIcon,
} from "lucide-react";

import categoryService from "@/src/services/category.service";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  active?: boolean;
}

const ICONS: LucideIcon[] = [Flower2, Gem, Sparkles, Crown];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await categoryService.getCategories();
        setCategories(
          (data || []).filter((c: Category) => c.active !== false)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  if (!loading && categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm uppercase tracking-[5px] text-[#C49A6C]">
            Shop By Category
          </span>

          <h2 className="mt-4 text-4xl font-light text-[#3D2A22] md:text-5xl">
            Find Your Bloom
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#6F625B]">
            Every category is a different way to wear a flower —
            browse by the piece you're missing.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-40 animate-pulse rounded-3xl bg-gray-100"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {categories.map((category, index) => {
              const Icon = ICONS[index % ICONS.length];

              return (
                <Link
                  key={category._id}
                  href={`/shop?category=${category._id}`}
                  className="group flex flex-col items-center gap-4 rounded-3xl border border-[#F0E4D6] bg-[#FBF7F2] px-6 py-10 text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#D6C2AF] hover:shadow-xl"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm transition group-hover:bg-[#B78A61]">
                    <Icon
                      size={26}
                      className="text-[#C48C75] transition group-hover:text-white"
                    />
                  </div>

                  <span className="font-medium text-[#3D2A22]">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
