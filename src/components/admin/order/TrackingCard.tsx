"use client";

import { useState } from "react";

import { toast } from "react-hot-toast";

import orderService from "@/src/services/order.service";
import { Order } from "@/src/types/order";

interface Props {
  order: Order;

  refresh: () => void;
}

export default function TrackingCard({
  order,
  refresh,
}: Props) {
  const [trackingNumber, setTrackingNumber] =
    useState(order.trackingNumber || "");

  const [loading, setLoading] =
    useState(false);

  async function saveTracking() {
    try {
      setLoading(true);

      await orderService.updateTracking(
        order._id,
        trackingNumber
      );

      toast.success(
        "Tracking number updated"
      );

      refresh();
    } catch (error: any) {
      toast.error(
        error.message ||
          "Failed to update tracking"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          Tracking
        </h2>
      </div>

      <div className="space-y-5 p-6">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Tracking Number
          </label>

          <input
            type="text"
            value={trackingNumber}
            onChange={(e) =>
              setTrackingNumber(
                e.target.value
              )
            }
            placeholder="Enter courier tracking number"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          />

        </div>

        <button
          onClick={saveTracking}
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-3 text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Save Tracking"}
        </button>

      </div>

    </div>
  );
}