"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Order } from "@/src/types/order";
import CustomerOrderTable from "@/src/components/account/orders/CustomerOrderTable";
import customerOrderService from "@/src/services/customer-order.service";
import { useAuth } from "@/src/hooks/useAuth";


export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  async function loadOrders() {
    try {
      setLoading(true);

      const data = await customerOrderService.getMyOrders();

      setOrders(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authLoading) return;

    if (!user) return;

    loadOrders();
  }, [authLoading, user]);

  if (loading || authLoading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <Loader2
          size={34}
          className="animate-spin"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 my-20 mx-10">

      <div>

        <h1 className="text-3xl font-bold">
          My Orders
        </h1>

        <p className="text-gray-500">
          View your recent orders
        </p>

      </div>

      <CustomerOrderTable
        orders={orders}
      />

    </div>
  );
}