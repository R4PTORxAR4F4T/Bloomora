"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import CouponForm from "@/src/components/admin/coupons/CouponForm";
import couponService from "@/src/services/coupon.service";

import {
  Coupon,
  CouponFormData,
} from "@/src/types/coupon";

export default function EditCouponPage() {
  const router = useRouter();

  const params = useParams();

  const id = params.id as string;

  const [coupon, setCoupon] =
    useState<Coupon | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    loadCoupon();
  }, []);

  async function loadCoupon() {
    try {
      setLoading(true);

      const data =
        await couponService.getCoupon(id);

      setCoupon(data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load coupon."
      );

      router.push("/admin/coupons");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(
    form: CouponFormData
  ) {
    try {
      setSaving(true);

      await couponService.updateCoupon(
        id,
        form
      );

      toast.success(
        "Coupon updated successfully."
      );

      router.push("/admin/coupons");

      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update coupon."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  if (!coupon) {
    return null;
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Coupon
        </h1>

        <p className="text-gray-500">
          Update coupon information.
        </p>

      </div>

      <CouponForm
        initialData={coupon}
        loading={saving}
        onSubmit={handleUpdate}
      />

    </div>
  );
}