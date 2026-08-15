"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import OrderTable from "@/src/components/admin/order/OrderTable";
import { AdminOrder } from "@/src/types/order";
import orderService from "@/src/services/order.service";

export default function OrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  async function loadOrders() {
    try {
      setLoading(true);

      const data =
        await orderService.getAllOrders();

      setOrders(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders =
    orders.filter((order) => {
      const keyword =
        search.toLowerCase();

      return (
        order.orderNumber
          .toLowerCase()
          .includes(keyword) ||
        order.user.name
          .toLowerCase()
          .includes(keyword) ||
        order.user.email
          .toLowerCase()
          .includes(keyword)
      );
    });

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage customer orders
          </p>
        </div>

      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search order number, customer..."
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
        />

      </div>

      {loading ? (
        <div className="flex h-60 items-center justify-center">

          <Loader2
            size={32}
            className="animate-spin"
          />

        </div>
      ) : (
        <OrderTable
          orders={filteredOrders}
          refresh={loadOrders}
        />
      )}

    </div>
  );
}