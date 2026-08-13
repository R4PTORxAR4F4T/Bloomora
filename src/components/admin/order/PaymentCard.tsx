"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import orderService from "@/src/services/order.service";
import { Order } from "@/src/types/order";

interface Props {
  order: Order;

  refresh: () => void;
}

export default function PaymentCard({
  order,
  refresh,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const [paymentStatus, setPaymentStatus] =
    useState(order.payment.status);

  const [transactionId, setTransactionId] =
    useState(
      order.payment.transactionId || ""
    );

  async function savePayment() {
    try {
      setLoading(true);

      await orderService.updatePaymentStatus(
        order._id,
        paymentStatus,
        transactionId
      );

      toast.success(
        "Payment updated successfully"
      );

      refresh();
    } catch (error: any) {
      toast.error(
        error.message ||
          "Failed to update payment"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
          Payment
        </h2>

      </div>

      <div className="space-y-5 p-6">

        {/* Method */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Payment Method
          </label>

          <input
            disabled
            value={order.payment.method.toUpperCase()}
            className="w-full rounded-lg border bg-gray-100 px-4 py-2"
          />

        </div>

        {/* Status */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Payment Status
          </label>

          <select
            value={paymentStatus}
            onChange={(e) =>
              setPaymentStatus(
                e.target.value as any
              )
            }
            className="w-full rounded-lg border px-4 py-2"
          >

            <option value="pending">
              Pending
            </option>

            <option value="paid">
              Paid
            </option>

            <option value="failed">
              Failed
            </option>

            <option value="refunded">
              Refunded
            </option>

          </select>

        </div>

        {/* Transaction */}

        {paymentStatus === "paid" && (

          <div>
            <label className="mb-2 block text-sm font-medium">
              Transaction ID
            </label>

            <input
              value={transactionId}
              onChange={(e) =>
                setTransactionId(
                  e.target.value
                )
              }
              placeholder="Enter Transaction ID"
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>
          
        )}

        <button
          onClick={savePayment}
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Update Payment"}
        </button>

      </div>

    </div>
  );
}