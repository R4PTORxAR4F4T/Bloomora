"use client";

import { OrderStatus } from "@/src/types/order";

interface Props {
  status: OrderStatus;
}

const statusStyles: Record<OrderStatus, string> = {
  pending:
    "bg-gray-100 text-gray-700",

  confirmed:
    "bg-blue-100 text-blue-700",

  processing:
    "bg-yellow-100 text-yellow-700",

  packed:
    "bg-orange-100 text-orange-700",

  shipped:
    "bg-purple-100 text-purple-700",

  delivered:
    "bg-green-100 text-green-700",

  cancelled:
    "bg-red-100 text-red-700",

  returned:
    "bg-gray-200 text-gray-700",

  refunded:
    "bg-pink-100 text-pink-700",
};

export default function OrderStatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}