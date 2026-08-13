"use client";

import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Clock3,
  Truck,
  CheckCircle,
  CreditCard,
  XCircle,
  RotateCcw,
  Wallet,
  Boxes,
} from "lucide-react";

import { DashboardOverview } from "@/src/types/dashboard";

interface Props {
  overview: DashboardOverview;
}

export default function DashboardStats({
  overview,
}: Props) {
  const cards = [
    {
      title: "Revenue",
      value: `৳${overview.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "Orders",
      value: overview.totalOrders,
      icon: ShoppingCart,
      color: "bg-blue-500",
    },
    {
      title: "Products",
      value: overview.totalProducts,
      icon: Package,
      color: "bg-purple-500",
    },
    {
      title: "Users",
      value: overview.totalUsers,
      icon: Users,
      color: "bg-cyan-500",
    },
    {
      title: "Pending",
      value: overview.pendingOrders,
      icon: Clock3,
      color: "bg-yellow-500",
    },
    {
      title: "Processing",
      value: overview.processingOrders,
      icon: Boxes,
      color: "bg-indigo-500",
    },
    {
      title: "Shipped",
      value: overview.shippedOrders,
      icon: Truck,
      color: "bg-sky-500",
    },
    {
      title: "Delivered",
      value: overview.deliveredOrders,
      icon: CheckCircle,
      color: "bg-emerald-500",
    },
    {
      title: "Paid",
      value: overview.paidOrders,
      icon: Wallet,
      color: "bg-green-600",
    },
    {
      title: "Pending Payment",
      value: overview.pendingPayments,
      icon: CreditCard,
      color: "bg-orange-500",
    },
    {
      title: "Cancelled",
      value: overview.cancelledOrders,
      icon: XCircle,
      color: "bg-red-500",
    },
    {
      title: "Returned",
      value: overview.returnedOrders,
      icon: RotateCcw,
      color: "bg-slate-500",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                  {card.value}
                </h2>
              </div>

              <div
                className={`rounded-xl p-3 text-white ${card.color}`}
              >
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}