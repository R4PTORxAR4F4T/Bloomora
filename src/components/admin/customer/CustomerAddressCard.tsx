"use client";

import { MapPin, Home } from "lucide-react";
import { Address } from "@/src/types/user";

interface Props {
  addresses: Address[];
}

export default function CustomerAddressCard({
  addresses,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
          Saved Addresses
        </h2>

      </div>

      <div className="p-6">

        {addresses.length === 0 ? (

          <div className="py-8 text-center text-gray-500">
            No saved addresses.
          </div>

        ) : (

          <div className="space-y-5">

            {addresses.map((address, index) => (

              <div
                key={index}
                className="rounded-xl border p-5"
              >

                <div className="mb-4 flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <Home
                      size={18}
                      className="text-gray-500"
                    />

                    <span className="font-semibold">
                      {address.label}
                    </span>

                  </div>

                  {address.isDefault && (

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Default
                    </span>

                  )}

                </div>

                <div className="space-y-2 text-sm">

                  <p>
                    <strong>Receiver:</strong>{" "}
                    {address.receiverName}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {address.phone}
                  </p>

                  <div className="flex items-start gap-2">

                    <MapPin
                      size={16}
                      className="mt-1 text-gray-500"
                    />

                    <div>

                      <p>
                        {address.address}
                      </p>

                      <p>
                        {address.area},{" "}
                        {address.district}
                      </p>

                      <p>
                        {address.division}
                      </p>

                      <p>
                        Postal Code:{" "}
                        {address.postalCode}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}