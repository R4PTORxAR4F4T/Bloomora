"use client";

import { Order } from "@/src/types/order";

interface Props {
  order: Order;
}

const statusColors: Record<string, string> = {
  confirmed: "bg-blue-500",
  processing: "bg-yellow-500",
  packed: "bg-orange-500",
  shipped: "bg-purple-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
  returned: "bg-gray-500",
  refunded: "bg-pink-500",
};

export default function OrderTimeline({
  order,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          Order Timeline
        </h2>
      </div>

      <div className="space-y-6 p-6">

        {order.timeline.length === 0 ? (
          <p className="text-sm text-gray-500">
            No timeline available.
          </p>
        ) : (
          order.timeline.map((item, index) => (
            <div
              key={index}
              className="relative flex gap-4"
            >
              {/* Timeline Line */}

              {index !==
                order.timeline.length - 1 && (
                <div className="absolute left-[10px] top-6 h-full w-0.5 bg-gray-200" />
              )}

              {/* Dot */}

              <div
                className={`mt-1 h-5 w-5 rounded-full ${
                  statusColors[item.status] ||
                  "bg-gray-400"
                }`}
              />

              {/* Content */}

              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <h3 className="font-semibold capitalize">
                    {item.status}
                  </h3>

                  <span className="text-xs text-gray-500">
                    {new Date(
                      item.updatedAt
                    ).toLocaleString()}
                  </span>

                </div>

                {item.note && (
                  <p className="mt-1 text-sm text-gray-600">
                    {item.note}
                  </p>
                )}

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}