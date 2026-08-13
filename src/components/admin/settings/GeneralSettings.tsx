"use client";

import { useSettings } from "@/src/context/SettingsContext";

export default function GeneralSettings() {
  const { settings, setSettings } = useSettings();

  if (!settings) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          General Settings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Basic information about your store.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Store Name
          </label>

          <input
            type="text"
            value={settings.storeName}
            onChange={(e) =>
              setSettings({
                ...settings,
                storeName: e.target.value,
              })
            }
            className="w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Store Description
          </label>

          <input
            type="text"
            value={settings.storeDescription}
            onChange={(e) =>
              setSettings({
                ...settings,
                storeDescription: e.target.value,
              })
            }
            className="w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Store Logo
          </label>

          <input
            type="file"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Favicon
          </label>

          <input
            type="file"
            className="w-full rounded-lg border p-3"
          />
        </div>
      </div>
    </div>
  );
}