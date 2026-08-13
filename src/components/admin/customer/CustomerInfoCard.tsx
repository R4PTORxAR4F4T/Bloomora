"use client";

import Image from "next/image";
import { Mail, Phone, Calendar, Shield, User } from "lucide-react";

import { Customer } from "@/src/types/user";

interface Props {
  customer: Customer;
}

export default function CustomerInfoCard({
  customer,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
          Customer Information
        </h2>

      </div>

      <div className="p-6">

        <div className="flex flex-col gap-6 md:flex-row md:items-center">

          {customer.photoURL ? (

            <Image
              src={customer.photoURL}
              alt={customer.name}
              width={96}
              height={96}
              className="rounded-full border object-cover"
            />

          ) : (

            <div className="flex h-24 w-24 items-center justify-center rounded-full border bg-gray-100">

              <User
                size={40}
                className="text-gray-400"
              />

            </div>

          )}

          <div className="flex-1">

            <h3 className="text-2xl font-bold">
              {customer.name}
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-gray-500"
                />

                <div>

                  <p className="text-xs uppercase text-gray-500">
                    Email
                  </p>

                  <p className="font-medium">
                    {customer.email}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-gray-500"
                />

                <div>

                  <p className="text-xs uppercase text-gray-500">
                    Phone
                  </p>

                  <p className="font-medium">
                    {customer.phone || "-"}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Shield
                  size={18}
                  className="text-gray-500"
                />

                <div>

                  <p className="text-xs uppercase text-gray-500">
                    Role
                  </p>

                  <p className="font-medium capitalize">
                    {customer.role}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Calendar
                  size={18}
                  className="text-gray-500"
                />

                <div>

                  <p className="text-xs uppercase text-gray-500">
                    Joined
                  </p>

                  <p className="font-medium">
                    {new Date(
                      customer.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Calendar
                  size={18}
                  className="text-gray-500"
                />

                <div>

                  <p className="text-xs uppercase text-gray-500">
                    Last Login
                  </p>

                  <p className="font-medium">
                    {customer.lastLogin
                      ? new Date(
                          customer.lastLogin
                        ).toLocaleString()
                      : "Never"}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Shield
                  size={18}
                  className="text-gray-500"
                />

                <div>

                  <p className="text-xs uppercase text-gray-500">
                    Email Verified
                  </p>

                  <p
                    className={`font-medium ${
                      customer.emailVerified
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {customer.emailVerified
                      ? "Verified"
                      : "Not Verified"}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}