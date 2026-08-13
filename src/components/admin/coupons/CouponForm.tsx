"use client";

import { useState } from "react";
import { Coupon, CouponFormData } from "@/src/types/coupon";

import CouponGeneral from "./CouponGeneral";
import CouponStatus from "./CouponStatus";
import CouponSubmit from "./CouponSubmit";

interface Props {
  initialData?: Coupon;

  loading?: boolean;

  onSubmit: (
    data: CouponFormData
  ) => Promise<void>;
}

export default function CouponForm({
  initialData,
  loading = false,
  onSubmit,
}: Props) {
  const [form, setForm] =
    useState<CouponFormData>({
      code: initialData?.code ?? "",

      description:
        initialData?.description ?? "",

      discountType:
        initialData?.discountType ??
        "percentage",

      discountValue:
        initialData?.discountValue ?? 0,

      minimumOrder:
        initialData?.minimumOrder ?? 0,

      maximumDiscount:
        initialData?.maximumDiscount ?? 0,

      usageLimit:
        initialData?.usageLimit ?? 0,

      startDate:
        initialData?.startDate
          ?.substring(0, 10) ?? "",

      endDate:
        initialData?.endDate
          ?.substring(0, 10) ?? "",

      active:
        initialData?.active ?? true,
    });

  function updateField<
    K extends keyof CouponFormData
  >(key: K, value: CouponFormData[K]) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <CouponGeneral
        form={form}
        updateField={updateField}
      />

      <CouponStatus
        form={form}
        updateField={updateField}
      />

      <CouponSubmit
        loading={loading}
        isEdit={!!initialData}
      />
    </form>
  );
}