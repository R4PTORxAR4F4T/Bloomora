"use client";

import { Order } from "@/src/types/order";

import PaymentStatusBadge from "./PaymentStatusBadge";

interface Props {
  order: Order;
}

export default function PaymentCard({
  order,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
          Payment Information
        </h2>

      </div>

      <div className="space-y-5 p-6">

        {/* Method */}

        <div>

          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Payment Method
          </p>

          <p className="mt-1 font-semibold uppercase">
            {order.payment.method}
          </p>

        </div>

        {/* Status */}

        <div>

          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Payment Status
          </p>

          <div className="mt-2">

            <PaymentStatusBadge
              status={order.payment.status}
            />

          </div>

        </div>

        {/* Transaction */}

        {order.payment.transactionId && (

          <div>

            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Transaction ID
            </p>

            <p className="mt-1 break-all font-medium">
              {order.payment.transactionId}
            </p>

          </div>

        )}

        {/* Paid Date */}

        {order.payment.paidAt && (

          <div>

            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Paid At
            </p>

            <p className="mt-1">
              {new Date(
                order.payment.paidAt
              ).toLocaleString()}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}