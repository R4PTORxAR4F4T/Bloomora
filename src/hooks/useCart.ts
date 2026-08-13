"use client";

import { useCartContext } from "@/src/providers/CartProvider";

export function useCart() {
  return useCartContext();
}