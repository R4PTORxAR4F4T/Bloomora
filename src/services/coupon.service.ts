import axios from "@/src/lib/axios";
import {
  Coupon,
  CouponFormData,
  CouponListResponse,
} from "@/src/types/coupon";

export interface CouponValidationResponse {
  coupon: {
    _id: string;
    code: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    maximumDiscount: number;
    minimumOrder: number;
  };

  discount: number;
}

class CouponService {
  async validateCoupon(
    code: string,
    subtotal: number
  ): Promise<CouponValidationResponse> {
    const { data } = await axios.post(
      "/coupons/validate",
      {
        code,
        subtotal,
      }
    );

    return data.data;
  }

  // =========================
  // Admin
  // =========================

  async getCoupons(
    page = 1,
    limit = 10,
    search = ""
  ): Promise<CouponListResponse> {
    const { data } = await axios.get(
      "/admin/coupons",
      {
        params: {
          page,
          limit,
          search,
        },
      }
    );

    return data.data;
  }

  async getCoupon(
    id: string
  ): Promise<Coupon> {
    const { data } = await axios.get(
      `/admin/coupons/${id}`
    );

    return data.data;
  }

  async createCoupon(
    coupon: CouponFormData
  ): Promise<Coupon> {
    const { data } = await axios.post(
      "/admin/coupons",
      coupon
    );

    return data.data;
  }

  async updateCoupon(
    id: string,
    coupon: CouponFormData
  ): Promise<Coupon> {
    const { data } = await axios.patch(
      `/admin/coupons/${id}`,
      coupon
    );

    return data.data;
  }

  async updateCouponStatus(
    id: string,
    active: boolean
  ): Promise<Coupon> {
    const { data } = await axios.patch(
      `/admin/coupons/${id}/status`,
      {
        active,
      }
    );

    return data.data;
  }

  async deleteCoupon(
    id: string
  ): Promise<void> {
    await axios.delete(
      `/admin/coupons/${id}`
    );
  }
}

export default new CouponService();