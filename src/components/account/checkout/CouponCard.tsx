"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

import couponService from "@/src/services/coupon.service";

interface Props {
  subtotal: number;

  onApply: (
    code: string,
    discount: number,
    coupon: any
  ) => void;

  onRemove: () => void;

  appliedCoupon?: any;
}

export default function CouponCard({
  subtotal,
  onApply,
  onRemove,
  appliedCoupon,
}: Props) {
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);

  async function applyCoupon() {
    if (!code.trim()) {
      toast.error("Enter coupon code");
      return;
    }

    try {
      setLoading(true);

      const result =
        await couponService.validateCoupon(
          code,
          subtotal
        );

      onApply(
        code.toUpperCase(),
        result.discount,
        result.coupon
      );

      toast.success("Coupon applied");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Invalid coupon"
      );
    } finally {
      setLoading(false);
    }
  }

  if (appliedCoupon) {
    return (
      <div className="rounded-xl border bg-white p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="font-semibold">
              Coupon Applied
            </p>

            <p className="text-sm text-gray-500">
              {appliedCoupon.code}
            </p>

          </div>

          <button
            onClick={onRemove}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6">

      <h2 className="mb-4 text-lg font-semibold">
        Coupon
      </h2>

      <div className="flex gap-3">

        <input
          value={code}
          onChange={(e) =>
            setCode(e.target.value)
          }
          placeholder="Enter coupon code"
          className="flex-1 rounded-lg border px-4 py-2"
        />

        <button
          disabled={loading}
          onClick={applyCoupon}
          className="rounded-lg bg-black px-5 text-white"
        >
          {loading
            ? "Applying..."
            : "Apply"}
        </button>

      </div>

    </div>
  );
}