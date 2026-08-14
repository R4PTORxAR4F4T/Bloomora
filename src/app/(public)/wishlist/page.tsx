"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/src/hooks/useAuth";
import { useWishlist } from "@/src/hooks/useWishlist";
import ProductCard from "@/src/components/product/ProductCard";

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();

  const {
    wishlist,
    wishlistCount,
    loading: wishlistLoading,
    clearWishlist,
  } = useWishlist();

  const loading = authLoading || (!!user && wishlistLoading);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="mb-10 text-5xl font-bold">Wishlist</h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
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

  if (!user) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F3E8DB]">
          <Heart className="text-[#B78A61]" size={28} />
        </div>

        <h1 className="mt-6 text-4xl font-bold">
          Save your favourites
        </h1>

        <p className="mt-3 max-w-md text-gray-500">
          Log in to start saving pieces you love and pick up right
          where you left off.
        </p>

        <Link
          href="/login"
          className="mt-8 rounded-lg bg-[#B78A61] px-8 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Log In
        </Link>
      </main>
    );
  }

  if (wishlist.length === 0) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F3E8DB]">
          <Heart className="text-[#B78A61]" size={28} />
        </div>

        <h1 className="mt-6 text-4xl font-bold">
          Your wishlist is empty
        </h1>

        <p className="mt-3 text-gray-500">
          Tap the heart on anything you love and it'll be saved
          here.
        </p>

        <Link
          href="/shop"
          className="mt-8 rounded-lg bg-[#B78A61] px-8 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Start Browsing
        </Link>
      </main>
    );
  }

  async function handleClear() {
    try {
      await clearWishlist();
      toast.success("Wishlist cleared");
    } catch (error) {
      console.error(error);
      toast.error("Couldn't clear your wishlist. Please try again.");
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Wishlist ({wishlistCount})
        </h1>

        <button onClick={handleClear} className="text-red-600">
          Clear Wishlist
        </button>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((product, index) => (
          <ProductCard
            key={product._id}
            product={product}
            priority={index === 0}
          />
        ))}
      </div>
    </main>
  );
}
