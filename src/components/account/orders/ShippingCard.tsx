"use client";

import { ShippingAddress } from "@/src/types/order";

interface Props {
  address: ShippingAddress;
}

export default function ShippingCard({
  address,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
          Shipping Address
        </h2>

      </div>

      <div className="space-y-5 p-6">

        <div>

          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Receiver
          </p>

          <p className="mt-1 font-semibold">
            {address.receiverName}
          </p>

        </div>

        <div>

          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Phone
          </p>

          <p className="mt-1">
            {address.phone}
          </p>

        </div>

        <div>

          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Address
          </p>

          <p className="mt-1 leading-7">

            {address.address}

            <br />

            {address.area},{" "}
            {address.district}

            <br />

            {address.division}

            <br />

            Postal Code:{" "}
            {address.postalCode}

          </p>

        </div>

      </div>

    </div>
  );
}