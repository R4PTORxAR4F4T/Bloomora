"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import OrderItems from "@/src/components/admin/order/OrderItems";
import ShippingCard from "@/src/components/admin/order/ShippingCard";
import PaymentCard from "@/src/components/admin/order/PaymentCard";
import TrackingCard from "@/src/components/admin/order/TrackingCard";
import OrderTimeline from "@/src/components/admin/order/OrderTimeline";
import OrderStatusCard from "@/src/components/admin/order/OrderStatusCard";
import { Order } from "@/src/types/order";
import orderService from "@/src/services/order.service";

export default function OrderDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] =
    useState(true);

  const [order, setOrder] =
    useState<Order | null>(null);

  async function loadOrder() {
    try {
      setLoading(true);

      const data =
        await orderService.getOrder(id);

      setOrder(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      loadOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2
          className="animate-spin"
          size={36}
        />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Order not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          {order.orderNumber}
        </h1>

        <p className="text-gray-500">
          Order Details
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="space-y-6 lg:col-span-2">

          <OrderItems
            order={order}
          />

          <OrderTimeline
            order={order}
          />

        </div>

        <div className="space-y-6">

          <ShippingCard
            address={
              order.shippingAddress
            }
          />

          <OrderStatusCard
            order={order}
            refresh={loadOrder}
          />

          <PaymentCard
            order={order}
            refresh={loadOrder}
          />

          <TrackingCard
            order={order}
            refresh={loadOrder}
          />

        </div>

      </div>

    </div>
  );
}