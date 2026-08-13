"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import CustomerTable from "@/src/components/admin/customer/CustomerTable";
import adminCustomerService from "@/src/services/admin-customer.service";

import { Customer } from "@/src/types/user";

export default function CustomersPage() {
  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  async function loadCustomers() {
    try {
      setLoading(true);

      const data =
        await adminCustomerService.getCustomers({
          search,
        });

      setCustomers(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      loadCustomers();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Customers
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage all registered customers
          </p>

        </div>

      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search by name, email or phone..."
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

        <CustomerTable
          customers={customers}
          refresh={loadCustomers}
        />

      )}

    </div>
  );
}