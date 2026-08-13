"use client";

import {
  Banknote,
  CreditCard,
  Landmark,
  Wallet,
} from "lucide-react";

import { PaymentMethod } from "@/src/types/order";

interface Props {
  methods: PaymentMethod[];

  value: PaymentMethod;

  onChange: (method: PaymentMethod) => void;
}

const paymentInfo: Record<
  PaymentMethod,
  {
    title: string;
    description: string;
    icon: React.ReactNode;
  }
> = {
  cod: {
    title: "Cash on Delivery",
    description:
      "Pay with cash when your order arrives.",
    icon: <Banknote size={22} />,
  },

  sslcommerz: {
    title: "SSLCommerz",
    description:
      "Cards, Mobile Banking & Internet Banking.",
    icon: <CreditCard size={22} />,
  },

  bkash: {
    title: "bKash",
    description:
      "Pay securely using your bKash wallet.",
    icon: <Wallet size={22} />,
  },

  nagad: {
    title: "Nagad",
    description:
      "Pay securely using your Nagad account.",
    icon: <Landmark size={22} />,
  },
};

export default function PaymentMethodSelector({
  methods,
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
          Payment Method
        </h2>

      </div>

      <div className="space-y-4 p-6">

        {methods.map((method) => {
          const payment = paymentInfo[method];

          return (
            <label
              key={method}
              className={`flex cursor-pointer items-center gap-4 rounded-xl border p-5 transition ${
                value === method
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                checked={value === method}
                onChange={() =>
                  onChange(method)
                }
              />

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                {payment.icon}
              </div>

              <div className="flex-1">

                <h3 className="font-semibold">
                  {payment.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {payment.description}
                </p>

              </div>

            </label>
          );
        })}

      </div>

    </div>
  );
}