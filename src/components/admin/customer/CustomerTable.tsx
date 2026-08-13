"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, User } from "lucide-react";

import { Customer } from "@/src/types/user";
import CustomerStatusBadge from "./CustomerStatusBadge";

interface Props {
  customers: Customer[];
  refresh: () => void;
}

export default function CustomerTable({
  customers,
}: Props) {
  if (customers.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
        <h3 className="text-lg font-semibold">
          No Customers Found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          There are no customers to display.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr className="text-left text-sm font-semibold text-gray-700">

              <th className="px-6 py-4">
                Customer
              </th>

              <th className="px-6 py-4">
                Phone
              </th>

              <th className="px-6 py-4">
                Orders
              </th>

              <th className="px-6 py-4">
                Total Spent
              </th>

              <th className="px-6 py-4">
                Role
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4">
                Joined
              </th>

              <th className="px-6 py-4 text-right">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {customers.map((customer) => (

              <tr
                key={customer._id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    {customer.photoURL ? (

                      <Image
                        src={customer.photoURL}
                        alt={customer.name}
                        width={44}
                        height={44}
                        className="rounded-full object-cover"
                      />

                    ) : (

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">

                        <User
                          size={20}
                          className="text-gray-500"
                        />

                      </div>

                    )}

                    <div>

                      <div className="font-semibold">
                        {customer.name}
                      </div>

                      <div className="text-sm text-gray-500">
                        {customer.email}
                      </div>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-5">
                  {customer.phone || "-"}
                </td>

                <td className="px-6 py-5 font-medium">
                  {customer.statistics?.totalOrders ?? 0}
                </td>

                <td className="px-6 py-5 font-semibold">
                  ৳
                  {(customer.statistics?.totalSpent ?? 0).toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  <span className="capitalize">
                    {customer.role}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <CustomerStatusBadge
                    active={customer.active}
                  />
                </td>

                <td className="px-6 py-5 text-sm text-gray-500">
                  {new Date(
                    customer.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-end">

                    <Link
                      href={`/admin/customers/${customer._id}`}
                      className="rounded-lg border p-2 transition hover:bg-black hover:text-white"
                    >
                      <Eye size={18} />
                    </Link>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}