"use client";

import { PaymentStatus } from "@/src/types/order";

interface Props {
  status: PaymentStatus;
}

const styles: Record<PaymentStatus, string> = {
  pending:
    "bg-yellow-100 text-yellow-800 border-yellow-200",

  paid:
    "bg-green-100 text-green-800 border-green-200",

  failed:
    "bg-red-100 text-red-800 border-red-200",

  refunded:
    "bg-purple-100 text-purple-800 border-purple-200",
};

export default function PaymentStatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}