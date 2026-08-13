"use client";

import {
  ShoppingBag,
  DollarSign,
  CreditCard,
  MapPin,
} from "lucide-react";

import {
  CustomerStatistics as CustomerStatisticsType,
  Address,
} from "@/src/types/user";

interface Props {
  statistics: CustomerStatisticsType;

  addresses?: Address[];
}

export default function CustomerStatistics({
  statistics,
  addresses = [],
}: Props) {
  const averageOrderValue =
    statistics.totalOrders > 0
      ? statistics.totalSpent /
        statistics.totalOrders
      : 0;

  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
          Customer Statistics
        </h2>

      </div>

      <div className="grid gap-5 p-6 md:grid-cols-2">

        <div className="rounded-xl border p-5">

          <div className="mb-3 flex items-center gap-3">

            <ShoppingBag
              size={22}
              className="text-gray-500"
            />

            <span className="text-sm text-gray-500">
              Total Orders
            </span>

          </div>

          <p className="text-3xl font-bold">
            {statistics.totalOrders}
          </p>

        </div>

        <div className="rounded-xl border p-5">

          <div className="mb-3 flex items-center gap-3">

            <DollarSign
              size={22}
              className="text-gray-500"
            />

            <span className="text-sm text-gray-500">
              Total Spent
            </span>

          </div>

          <p className="text-3xl font-bold">
            ৳
            {statistics.totalSpent.toLocaleString()}
          </p>

        </div>

        <div className="rounded-xl border p-5">

          <div className="mb-3 flex items-center gap-3">

            <CreditCard
              size={22}
              className="text-gray-500"
            />

            <span className="text-sm text-gray-500">
              Average Order
            </span>

          </div>

          <p className="text-3xl font-bold">
            ৳
            {averageOrderValue.toFixed(0)}
          </p>

        </div>

        <div className="rounded-xl border p-5">

          <div className="mb-3 flex items-center gap-3">

            <MapPin
              size={22}
              className="text-gray-500"
            />

            <span className="text-sm text-gray-500">
              Saved Addresses
            </span>

          </div>

          <p className="text-3xl font-bold">
            {addresses.length}
          </p>

        </div>

      </div>

    </div>
  );
}