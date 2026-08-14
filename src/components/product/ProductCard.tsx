"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

import { useAuth } from "@/src/hooks/useAuth";
import { useWishlist } from "@/src/hooks/useWishlist";
import { Product } from "@/src/types/product";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [saving, setSaving] = useState(false);

  const saved = isInWishlist(product._id);

  const hasDiscount =
    !!product.discountPrice && product.discountPrice > 0;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - (product.discountPrice as number)) /
          product.price) *
          100
      )
    : 0;

  const stockLabel =
    product.stock === 0
      ? { text: "Out of Stock", className: "text-red-500" }
      : product.stock <= 5
      ? {
          text: `Only ${product.stock} left`,
          className: "text-amber-600",
        }
      : { text: "In Stock", className: "text-green-600" };

  async function handleWishlistClick(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please log in to save items to your wishlist");
      return;
    }

    if (saving) return;

    setSaving(true);

    try {
      await toggleWishlist(product._id);
      toast.success(
        saved ? "Removed from wishlist" : "Added to wishlist"
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={
            product.images?.[0]?.url ||
            "/images/collections/default-placeholder.png"
          }
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          loading="eager"
          priority={priority}
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {(hasDiscount || product.newArrival || product.bestSeller) && (
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {hasDiscount && (
              <span className="rounded-full bg-[#B85C4A] px-2.5 py-1 text-[11px] font-bold text-white">
                -{discountPercent}%
              </span>
            )}

            {product.newArrival && (
              <span className="rounded-full bg-[#3D2A22] px-2.5 py-1 text-[11px] font-bold text-white">
                New
              </span>
            )}

            {!product.newArrival && product.bestSeller && (
              <span className="rounded-full bg-[#B78A61] px-2.5 py-1 text-[11px] font-bold text-white">
                Best Seller
              </span>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={
            saved ? "Remove from wishlist" : "Add to wishlist"
          }
          disabled={saving}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 disabled:cursor-not-allowed"
        >
          <Heart
            size={18}
            className={
              saved
                ? "fill-[#B78A61] text-[#B78A61]"
                : "text-[#3D2A22]"
            }
          />
        </button>
      </div>

      <div className="space-y-3 p-5">
        <h2 className="line-clamp-2 text-lg font-semibold">
          {product.name}
        </h2>

        <div className="flex items-center gap-2">
          {hasDiscount ? (
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
          <span>⭐ {product.rating?.toFixed(1) ?? "0.0"}</span>

          <span className={stockLabel.className}>
            {stockLabel.text}
          </span>
        </div>
      </div>
    </Link>
  );
}
