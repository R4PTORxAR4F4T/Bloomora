"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import CouponForm from "@/src/components/admin/coupons/CouponForm";
import couponService from "@/src/services/coupon.service";
import { CouponFormData } from "@/src/types/coupon";

export default function CreateCouponPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleCreate(
    data: CouponFormData
  ) {
    try {
      setLoading(true);

      await couponService.createCoupon(data);

      toast.success(
        "Coupon created successfully."
      );

      router.push("/admin/coupons");

      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create coupon."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Create Coupon
        </h1>

        <p className="text-gray-500">
          Create a new discount coupon for customers.
        </p>

      </div>

      <CouponForm
        loading={loading}
        onSubmit={handleCreate}
      />

    </div>
  );
}