"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import orderService from "@/src/services/order.service";
import { Order } from "@/src/types/order";

interface Props {
  order: Order;

  refresh: () => void;
}

const statuses: Order["orderStatus"][] = [
  "confirmed",
  "processing",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
  "refunded",
];

export default function OrderStatusCard({
  order,
  refresh,
}: Props) {
  const [status, setStatus] = useState(
    order.orderStatus
  );

  const [loading, setLoading] =
    useState(false);

  async function updateStatus() {
    try {
      setLoading(true);

      await orderService.updateOrderStatus(
        order._id,
        status
      );

      toast.success(
        "Order status updated"
      );

      refresh();
    } catch (error: any) {
      toast.error(
        error.message ||
          "Failed to update order"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
          Order Status
        </h2>

      </div>

      <div className="space-y-5 p-6">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Current Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target
                  .value as Order["orderStatus"]
              )
            }
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          >
            {statuses.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item
                  .charAt(0)
                  .toUpperCase() +
                  item.slice(1)}
              </option>
            ))}
          </select>

        </div>

        <button
          onClick={updateStatus}
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading
            ? "Updating..."
            : "Update Status"}
        </button>

      </div>

    </div>
  );
}