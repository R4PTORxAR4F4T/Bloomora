"use client";

import { CreditCard } from "lucide-react";
import { useSettings } from "@/src/context/SettingsContext";

export default function PaymentSettings() {
  const { settings, setSettings } = useSettings();

  if (!settings) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <CreditCard
          size={22}
          className="text-gray-700"
        />

        <div>
          <h2 className="text-xl font-semibold">
            Payment Settings
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enable or disable payment methods available to customers.
          </p>
        </div>
      </div>

      <div className="space-y-4">

        <label className="flex items-center justify-between rounded-lg border p-4">

          <div>

            <h4 className="font-medium">
              Cash on Delivery (COD)
            </h4>

            <p className="text-sm text-gray-500">
              Allow customers to pay after receiving their order.
            </p>

          </div>

          <input
            type="checkbox"
            checked={settings.enableCOD}
            onChange={(e) =>
              setSettings({
                ...settings,
                enableCOD: e.target.checked,
              })
            }
          />

        </label>

        <label className="flex items-center justify-between rounded-lg border p-4">

          <div>

            <h4 className="font-medium">
              SSLCommerz
            </h4>

            <p className="text-sm text-gray-500">
              Accept debit cards, credit cards and internet banking.
            </p>

          </div>

          <input
            type="checkbox"
            checked={settings.enableSSLCommerz}
            onChange={(e) =>
              setSettings({
                ...settings,
                enableSSLCommerz: e.target.checked,
              })
            }
          />

        </label>

        <label className="flex items-center justify-between rounded-lg border p-4">

          <div>

            <h4 className="font-medium">
              bKash
            </h4>

            <p className="text-sm text-gray-500">
              Enable payments through bKash.
            </p>

          </div>

          <input
            type="checkbox"
            checked={settings.enableBkash}
            onChange={(e) =>
              setSettings({
                ...settings,
                enableBkash: e.target.checked,
              })
            }
          />

        </label>

        <label className="flex items-center justify-between rounded-lg border p-4">

          <div>

            <h4 className="font-medium">
              Nagad
            </h4>

            <p className="text-sm text-gray-500">
              Enable payments through Nagad.
            </p>

          </div>

          <input
            type="checkbox"
            checked={settings.enableNagad}
            onChange={(e) =>
              setSettings({
                ...settings,
                enableNagad: e.target.checked,
              })
            }
          />

        </label>

      </div>
    </div>
  );
}