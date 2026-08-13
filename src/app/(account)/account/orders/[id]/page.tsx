"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import customerOrderService from "@/src/services/customer-order.service";
import { Order } from "@/src/types/order";

import OrderItems from "@/src/components/account/orders/OrderItems";
import ShippingCard from "@/src/components/account/orders/ShippingCard";
import PaymentCard from "@/src/components/account/orders/PaymentCard";
import OrderTimeline from "@/src/components/account/orders/OrderTimeline";

export default function CustomerOrderDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState<Order | null>(null);

  async function loadOrder() {
    try {
      setLoading(true);

      const data =
        await customerOrderService.getOrder(id);

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
        <Loader2 className="animate-spin" size={34} />
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
    <div className="space-y-6 mx-10 my-24">

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

          <OrderItems order={order} />

          <OrderTimeline order={order} />

        </div>

        <div className="space-y-6">

          <ShippingCard
            address={order.shippingAddress}
          />

          <PaymentCard order={order} />

        </div>

      </div>

    </div>
  );
}