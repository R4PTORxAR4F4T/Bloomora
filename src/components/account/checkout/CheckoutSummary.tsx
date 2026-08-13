"use client";

import { CheckoutData } from "@/src/types/order";
import Image from "next/image";

interface Props {
  checkout: CheckoutData;
}

export default function CheckoutSummary({
  checkout,
}: Props) {
  
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
          Order Summary
        </h2>

      </div>

      <div className="border-b divide-y">

        {checkout.items.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-5 p-5"
          >

            <div className="relative h-20 w-20 overflow-hidden rounded-lg border bg-gray-100">

              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="eager"
                className="object-cover"
              />

            </div>

            <div className="flex-1">

              <h3 className="font-semibold">
                {item.name}
              </h3>

              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">

                {item.color && (
                  <span className="flex items-center gap-2">

                    Color

                    <span
                      className="h-4 w-4 rounded-full border"
                      style={{
                        background: item.color,
                      }}
                    />

                  </span>
                )}

                <span>
                  Qty:
                  <strong className="ml-1 text-gray-700">
                    {item.quantity}
                  </strong>
                </span>

              </div>

            </div>

            <div className="text-right">

              <p className="text-sm text-gray-500">
                ৳
                {item.unitPrice.toLocaleString()}
              </p>

              <p className="mt-1 text-lg font-bold">
                ৳
                {item.subtotal.toLocaleString()}
              </p>

            </div>

          </div>

        ))}

      </div>

      <div className="border-t bg-gray-50 p-6">

        <div className="space-y-3">

          <div className="flex justify-between">

            <span>
              Subtotal
            </span>

            <span>
              ৳
              {checkout.subtotal.toLocaleString()}
            </span>

          </div>

          <div className="flex justify-between">

            <span>
              Shipping
            </span>

            <span>
              ৳
              {checkout.shippingFee.toLocaleString()}
            </span>

          </div>

          <div className="flex justify-between">

            <span>
              Discount
            </span>

            <span>
              - ৳
              {checkout.discount.toLocaleString()}
            </span>

          </div>

          <div className="mt-4 flex justify-between border-t pt-4 text-xl font-bold">

            <span>
              Total
            </span>

            <span>
              ৳
              {checkout.total.toLocaleString()}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}