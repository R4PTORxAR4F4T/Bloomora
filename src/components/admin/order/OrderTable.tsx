"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";
import { Order } from "@/src/types/order";

interface Props {
  orders: Order[];

  refresh: () => void;
}

export default function OrderTable({
  orders,
}: Props) {
  if (orders.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
        <h3 className="text-lg font-semibold">
          No Orders Found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          There are no orders to display.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr className="text-left text-sm font-semibold text-gray-700">

              <th className="px-6 py-4">
                Order
              </th>

              <th className="px-6 py-4">
                Customer
              </th>

              <th className="px-6 py-4">
                Total
              </th>

              <th className="px-6 py-4">
                Payment
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4">
                Date
              </th>

              <th className="px-6 py-4 text-right">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order._id}
                className="border-t transition hover:bg-gray-50"
              >

                <td className="px-6 py-5">

                  <div className="font-semibold">
                    {order.orderNumber}
                  </div>

                </td>

                <td className="px-6 py-5">

                  <div className="font-medium">
                    {order.user.name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {order.user.email}
                  </div>

                </td>

                <td className="px-6 py-5 font-semibold">
                  ৳{order.total.toLocaleString()}
                </td>

                <td className="px-6 py-5">

                  <PaymentStatusBadge
                    status={
                      order.payment.status
                    }
                  />

                </td>

                <td className="px-6 py-5">

                  <OrderStatusBadge
                    status={
                      order.orderStatus
                    }
                  />

                </td>

                <td className="px-6 py-5 text-sm text-gray-500">

                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}

                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-end">

                    <Link
                      href={`/admin/orders/${order._id}`}
                      className="rounded-lg border p-2 transition hover:bg-black hover:text-white"
                    >
                      <Eye size={18} />
                    </Link>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}