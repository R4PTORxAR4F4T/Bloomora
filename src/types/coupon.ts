export type CouponDiscountType =
  | "percentage"
  | "fixed";

export interface Coupon {
  _id: string;

  code: string;

  description: string;

  discountType: CouponDiscountType;

  discountValue: number;

  minimumOrder: number;

  maximumDiscount: number;

  usageLimit: number;

  usedCount: number;

  startDate: string;

  endDate: string;

  active: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface CouponListResponse {
  coupons: Coupon[];

  pagination: {
    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}

export interface CouponFormData {
  code: string;

  description: string;

  discountType: CouponDiscountType;

  discountValue: number;

  minimumOrder: number;

  maximumDiscount: number;

  usageLimit: number;

  startDate: string;

  endDate: string;

  active: boolean;
}