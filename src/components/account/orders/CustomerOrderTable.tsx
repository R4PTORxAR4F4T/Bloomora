"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import { Order } from "@/src/types/order";

import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

interface Props {
  orders: Order[];
}

export default function CustomerOrderTable({
  orders,
}: Props) {
  if (orders.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center shadow-sm">

        <h2 className="text-xl font-semibold">
          No Orders Yet
        </h2>

        <p className="mt-2 text-gray-500">
          You haven't placed any orders yet.
        </p>

        <Link
          href="/shop"
          className="mt-6 inline-flex rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800"
        >
          Start Shopping
        </Link>

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
                Date
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

                <td className="px-6 py-5 font-semibold">
                  {order.orderNumber}
                </td>

                <td className="px-6 py-5 text-sm text-gray-500">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-5 font-semibold">
                  ৳
                  {order.total.toLocaleString()}
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

                <td className="px-6 py-5">

                  <div className="flex justify-end">

                    <Link
                      href={`/account/orders/${order._id}`}
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