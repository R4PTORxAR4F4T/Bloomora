"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import adminCustomerService from "@/src/services/admin-customer.service";

import { CustomerDetails } from "@/src/types/user";

import CustomerInfoCard from "@/src/components/admin/customer/CustomerInfoCard";
import CustomerStatistics from "@/src/components/admin/customer/CustomerStatistics";
import CustomerAddressCard from "@/src/components/admin/customer/CustomerAddressCard";
import CustomerOrdersCard from "@/src/components/admin/customer/CustomerOrdersCard";
import CustomerStatusCard from "@/src/components/admin/customer/CustomerStatusCard";

export default function CustomerDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] =
    useState(true);

  const [customer, setCustomer] =
    useState<CustomerDetails | null>(null);

  async function loadCustomer() {
    try {
      setLoading(true);

      const data =
        await adminCustomerService.getCustomer(id);

      setCustomer(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      loadCustomer();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2
          size={36}
          className="animate-spin"
        />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Customer not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          {customer.user.name}
        </h1>

        <p className="text-gray-500">
          Customer Details
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="space-y-6 lg:col-span-2">

          <CustomerInfoCard
            customer={customer.user}
          />

          <CustomerStatistics
            statistics={customer.statistics}
            addresses={customer.user.addresses}
          />

          <CustomerAddressCard
            addresses={
              customer.user.addresses
            }
          />

          <CustomerOrdersCard
            orders={
              customer.recentOrders || []
            }
          />

        </div>

        <div>

          <CustomerStatusCard
            customer={customer.user}
            refresh={loadCustomer}
          />

        </div>

      </div>

    </div>
  );
}