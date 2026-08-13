"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/src/hooks/useCart";

export default function CartPage() {
  const {
    cart,
    cartCount,
    loading,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="mb-8 text-4xl font-bold">
          Shopping Cart
        </h1>

        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-xl bg-gray-200"
            />
          ))}
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold">
          Your cart is empty
        </h1>

        <p className="mt-3 text-gray-500">
          Looks like you haven't added anything yet.
        </p>

        <Link
          href="/shop"
          className="mt-8 rounded-lg bg-[#B78A61] px-8 py-3 font-semibold text-white"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  const subtotal = cart.reduce(
    (sum: number, item: any) => {
      const price =
        item.product?.discountPrice > 0
          ? item.product.discountPrice
          : item.product?.price || 0;

      return sum + price * item.quantity;
    },
    0
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Shopping Cart ({cartCount})
        </h1>

        <button
          onClick={clearCart}
          className="text-red-600"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Items */}

        <div className="space-y-5">
          {cart.map((item: any) => {

            const product = item.product;

            const price =
              product.discountPrice > 0
                ? product.discountPrice
                : product.price;

            return (
              <div
                key={
                  item._id ??
                  `${item.productId}-${item.color}`
                }
                className="flex gap-5 rounded-xl border bg-white p-5"
              >
                <div className="relative h-32 w-32 overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={product.images?.[0]?.url}
                    alt={product?.name ?? ""}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="eager"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                    <a href={`/shop/${product.slug}`}>
                        <h2 className="text-xl font-semibold">
                            {product?.name}
                        </h2>
                    </a>
                  
                  {item.product.colors?.length > 0 && (
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-gray-500">Color:</span>

                      <div className="flex items-center gap-1">
                        {item.product.colors.map((color: string, index: number) => (
                          <span
                            key={index}
                            className="h-4 w-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="mt-3 text-xl font-bold text-[#B78A61]">
                    ৳{price}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-lg border">
                      <button
                        className="p-3"
                        onClick={() => {
                        if (item.quantity === 1) {
                            removeItem(
                            item._id ?? item.productId,
                            item.color
                            );
                            return;
                        }

                        updateQuantity(
                            item._id ?? item.productId,
                            item.quantity - 1,
                            item.color
                        );
                        }}
                      >
                        <Minus size={18} />
                      </button>

                      <span className="w-12 text-center font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        className="p-3"
                        onClick={() =>
                          updateQuantity(
                            item._id ??
                              item.productId,
                            item.quantity + 1
                          )
                        }
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        removeItem(
                          item._id ??
                            item.productId
                        )
                      }
                      className="text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}

        <div className="h-fit rounded-2xl border bg-white p-6">
          <h2 className="mb-6 text-2xl font-bold">
            Order Summary
          </h2>

          <div className="mb-4 flex justify-between">
            <span>Subtotal</span>

            <span>৳{subtotal}</span>
          </div>

          <div className="mb-6 flex justify-between">
            <span>Shipping</span>

            <span>Calculated at checkout</span>
          </div>

          <div className="mb-8 border-t pt-5">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>

              <span>৳{subtotal}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="block rounded-lg bg-[#B78A61] py-4 text-center font-semibold text-white transition hover:opacity-90"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}