"use client";

import Link from "next/link";
import {
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

interface RecentOrder {
  _id: string;
  orderNumber: string;
  total: number;
  orderStatus: string;
  payment: {
    status: string;
  };
  createdAt: string;
}

interface Props {
  orders: RecentOrder[];
}

const orderColors: Record<string, string> = {
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  packed: "bg-orange-100 text-orange-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  returned: "bg-gray-100 text-gray-700",
  refunded: "bg-pink-100 text-pink-700",
};

export default function CustomerOrdersCard({
  orders,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
          Recent Orders
        </h2>

      </div>

      {orders.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-12">

          <ShoppingBag
            size={48}
            className="text-gray-300"
          />

          <p className="mt-4 text-gray-500">
            No orders found
          </p>

        </div>

      ) : (

        <div className="divide-y">

          {orders.map((order) => (

            <div
              key={order._id}
              className="flex items-center justify-between px-6 py-5"
            >

              <div>

                <p className="font-semibold">
                  {order.orderNumber}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold">
                  ৳
                  {order.total.toLocaleString()}
                </p>

                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    orderColors[
                      order.orderStatus
                    ] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.orderStatus}
                </span>

              </div>

              <Link
                href={`/admin/orders/${order._id}`}
                className="ml-6 rounded-lg border p-2 transition hover:bg-black hover:text-white"
              >
                <ArrowRight size={18} />
              </Link>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}