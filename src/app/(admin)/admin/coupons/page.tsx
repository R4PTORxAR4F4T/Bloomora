"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Search } from "lucide-react";

import couponService from "@/src/services/coupon.service";
import CouponTable from "@/src/components/admin/coupons/CouponTable";
import DeleteCouponModal from "@/src/components/admin/coupons/DeleteCouponModal";

import {
  Coupon,
  CouponListResponse,
} from "@/src/types/coupon";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const [loading, setLoading] = useState(true);

  const [deleting, setDeleting] =
    useState(false);

  const [selectedCoupon, setSelectedCoupon] =
    useState<Coupon | null>(null);

  const [search, setSearch] = useState("");

  async function loadCoupons() {
    try {
      setLoading(true);

      const response = await couponService.getCoupons(1,10,search);

      setCoupons(response.coupons);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load coupons."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      loadCoupons();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  async function handleStatus(
    coupon: Coupon
  ) {
    try {
      await couponService.updateCouponStatus(
        coupon._id,
        !coupon.active
      );

      toast.success(
        "Coupon updated successfully."
      );

      loadCoupons();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update coupon."
      );
    }
  }

  async function handleDelete() {
    if (!selectedCoupon) return;

    try {
      setDeleting(true);

      await couponService.deleteCoupon(
        selectedCoupon._id
      );

      toast.success(
        "Coupon deleted successfully."
      );

      setSelectedCoupon(null);

      loadCoupons();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete coupon."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Coupons
          </h1>

          <p className="text-gray-500">
            Manage discount coupons.
          </p>

        </div>

        <Link
          href="/admin/coupons/create"
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          <Plus size={18} />

          New Coupon
        </Link>

      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search coupon..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 outline-none transition focus:border-black"
          />

        </div>
      </div>
      
      {loading ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          Loading...
        </div>
      ) : (
        <CouponTable
          coupons={coupons}
          onStatusChange={handleStatus}
          onDelete={setSelectedCoupon}
        />
      )}

      <DeleteCouponModal
        coupon={selectedCoupon}
        loading={deleting}
        onClose={() =>
          setSelectedCoupon(null)
        }
        onConfirm={handleDelete}
      />

    </div>
  );
}