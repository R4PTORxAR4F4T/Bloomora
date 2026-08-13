"use client";

import Link from "next/link";
import { Coupon } from "@/src/types/coupon";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  coupons: Coupon[];

  onStatusChange: (
    coupon: Coupon
  ) => void;

  onDelete: (
    coupon: Coupon
  ) => void;
}

export default function CouponTable({
  coupons,
  onStatusChange,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-5 py-3 text-left text-sm font-semibold">
                Code
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold">
                Discount
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold">
                Minimum
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold">
                Usage
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold">
                Duration
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-5 py-3 text-right text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {coupons.length === 0 ? (
              <tr>

                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-500"
                >
                  No coupons found.
                </td>

              </tr>
            ) : (
              coupons.map((coupon) => (
                <tr
                  key={coupon._id}
                  className="border-t"
                >
                  <td className="px-5 py-4 font-semibold">
                    {coupon.code}
                  </td>

                  <td className="px-5 py-4">

                    {coupon.discountType ===
                    "percentage"
                      ? `${coupon.discountValue}%`
                      : `৳${coupon.discountValue}`}

                  </td>

                  <td className="px-5 py-4">

                    ৳
                    {coupon.minimumOrder.toLocaleString()}

                  </td>

                  <td className="px-5 py-4">

                    {coupon.usedCount}

                    {coupon.usageLimit > 0 &&
                      ` / ${coupon.usageLimit}`}

                  </td>

                  <td className="px-5 py-4 text-sm">

                    <div>
                      {new Date(
                        coupon.startDate
                      ).toLocaleDateString()}
                    </div>

                    <div className="text-gray-500">
                      {new Date(
                        coupon.endDate
                      ).toLocaleDateString()}
                    </div>

                  </td>

                  <td className="px-5 py-4">

                    <button
                      onClick={() =>
                        onStatusChange(coupon)
                      }
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        coupon.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {coupon.active
                        ? "Active"
                        : "Inactive"}
                    </button>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-end gap-2">

                      <Link
                        href={`/admin/coupons/edit/${coupon._id}`}
                        className="rounded border px-3 py-3 hover:bg-gray-100"
                      >
                        <Pencil
                          size={18}
                          className="text-blue-600"
                        />
                      </Link>

                      <button
                        onClick={() =>
                          onDelete(coupon)
                        }
                        className="rounded border border-red-500 px-3 py-3 text-red-600 hover:bg-red-50"
                      >
                        <Trash2
                          size={18}
                          className="text-red-600"
                        />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}