"use client";

import { RecentOrder } from "@/src/types/dashboard";

interface Props {
  orders: RecentOrder[];
}

export default function RecentOrders({
  orders,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Orders
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left text-sm text-gray-500">
              <th className="py-3">Order</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-4 font-medium">
                  {order.orderNumber}
                </td>

                <td>
                  <div>
                    <p className="font-medium">
                      {order.user?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.user?.email}
                    </p>
                  </div>
                </td>

                <td>
                  ৳
                  {order.total.toLocaleString()}
                </td>

                <td>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs">
                    {order.orderStatus}
                  </span>
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      order.paymentStatus ===
                      "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}