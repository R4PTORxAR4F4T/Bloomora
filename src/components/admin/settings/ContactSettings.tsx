"use client";

import { useSettings } from "@/src/context/SettingsContext";

export default function ContactSettings() {
  const { settings, setSettings } = useSettings();

  if (!settings) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Contact Settings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Store contact information shown to customers.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Store Email
          </label>

          <input
            type="email"
            value={settings.email}
            onChange={(e) =>
              setSettings({
                ...settings,
                email: e.target.value,
              })
            }
            className="w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Phone Number
          </label>

          <input
            type="text"
            value={settings.phone}
            onChange={(e) =>
              setSettings({
                ...settings,
                phone: e.target.value,
              })
            }
            className="w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Store Address
        </label>

        <textarea
          rows={4}
          value={settings.address}
          onChange={(e) =>
            setSettings({
              ...settings,
              address: e.target.value,
            })
          }
          className="w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
        />
      </div>
    </div>
  );
}