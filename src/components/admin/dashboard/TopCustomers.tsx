"use client";

import { CustomerSummary } from "@/src/types/dashboard";

interface Props {
  customers: CustomerSummary[];
}

export default function TopCustomers({
  customers,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Top Customers
      </h2>

      <div className="space-y-4">
        {customers.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            No customer data found.
          </p>
        ) : (
          customers.map((customer) => (
            <div
              key={customer.id}
              className="flex items-center justify-between border-b pb-4 last:border-none last:pb-0"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B78A61] text-lg font-semibold text-white">
                  {customer.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-medium">
                    {customer.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {customer.email}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ৳
                  {customer.totalSpent.toLocaleString()}
                </p>

                <p className="text-sm text-gray-500">
                  {customer.totalOrders} Orders
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}