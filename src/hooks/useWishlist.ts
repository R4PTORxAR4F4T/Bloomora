"use client";

import { useWishlistContext } from "@/src/providers/WishlistProvider";

export function useWishlist() {
  return useWishlistContext();
}
