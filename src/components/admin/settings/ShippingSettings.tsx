"use client";

import { Truck } from "lucide-react";
import { useSettings } from "@/src/context/SettingsContext";

export default function ShippingSettings() {
  const { settings, setSettings } = useSettings();

  if (!settings) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Truck
          className="text-gray-700"
          size={22}
        />

        <div>
          <h2 className="text-xl font-semibold">
            Shipping Settings
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Configure shipping charges.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Default Shipping Fee (৳)
          </label>

          <input
            type="number"
            value={settings.shippingFee}
            onChange={(e) =>
              setSettings({
                ...settings,
                shippingFee: Number(e.target.value),
              })
            }
            className="w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Free Shipping Minimum (৳)
          </label>

          <input
            type="number"
            value={settings.freeShippingMinimum}
            onChange={(e) =>
              setSettings({
                ...settings,
                freeShippingMinimum: Number(
                  e.target.value
                ),
              })
            }
            className="w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 rounded-lg border bg-gray-50 p-4">
        <p className="text-sm text-gray-600">
          Orders above{" "}
          <span className="font-semibold">
            ৳{settings.freeShippingMinimum}
          </span>{" "}
          qualify for free shipping.
        </p>
      </div>
    </div>
  );
}