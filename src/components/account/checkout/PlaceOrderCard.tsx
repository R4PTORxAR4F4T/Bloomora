"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import customerOrderService from "@/src/services/customer-order.service";
import { CheckoutData, PaymentMethod } from "@/src/types/order";

interface Props {
  checkout: CheckoutData;
  addressId: string;
  paymentMethod: PaymentMethod;

  couponCode?: string;
}

export default function PlaceOrderCard({
  checkout,
  addressId,
  paymentMethod,
  couponCode,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function placeOrder() {
    if (!addressId) {
      toast.error(
        "Please select a shipping address."
      );

      return;
    }

    try {
      setLoading(true);

      const order =
        await customerOrderService.placeOrder(
          addressId,
          paymentMethod,
          couponCode
        );

      toast.success(
        "Order placed successfully."
      );

      // Payment gateway integration
      // will be added later.
      if (paymentMethod === "cod") {
        router.push(`/account/orders/${order._id}`);
        return;
      }

      // Temporary behavior
      // if (paymentMethod === "sslcommerz") {
      //     window.location.href = order.paymentUrl;
      //     return;
      // }
      router.push(`/account/orders/${order._id}`);
      
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to place order."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sticky top-24 rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
          Place Order
        </h2>

      </div>

      <div className="space-y-4 p-6">

        <div className="flex justify-between">

          <span className="text-gray-600">
            Subtotal
          </span>

          <span>
            ৳
            {checkout.subtotal.toLocaleString()}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-600">
            Shipping
          </span>

          <span>
            ৳
            {checkout.shippingFee.toLocaleString()}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-600">
            Discount
          </span>

          <span>
            - ৳
            {checkout.discount.toLocaleString()}
          </span>

        </div>

        <div className="flex justify-between border-t pt-4 text-xl font-bold">

          <span>Total</span>

          <span>
            ৳
            {checkout.total.toLocaleString()}
          </span>

        </div>

        <button
          onClick={placeOrder}
          disabled={
            loading || !addressId
          }
          className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Placing Order..."
            : "Place Order"}
        </button>

      </div>

    </div>
  );
}