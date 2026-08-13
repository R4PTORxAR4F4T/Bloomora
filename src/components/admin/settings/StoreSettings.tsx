"use client";

import { useSettings } from "@/src/context/SettingsContext";

export default function StoreSettings() {
  const { settings, setSettings } = useSettings();

  if (!settings) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Store Settings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Configure store behavior and defaults.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Currency
          </label>

          <select
            value={settings.currency}
            onChange={(e) =>
              setSettings({
                ...settings,
                currency: e.target.value,
              })
            }
            className="w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
          >
            <option value="BDT">
              Bangladeshi Taka (৳)
            </option>

            <option value="USD">
              US Dollar ($)
            </option>

            <option value="EUR">
              Euro (€)
            </option>
          </select>
        </div>

        <div className="space-y-5">
          <label className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <h4 className="font-medium">
                Maintenance Mode
              </h4>

              <p className="text-sm text-gray-500">
                Temporarily disable customer access.
              </p>
            </div>

            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maintenanceMode: e.target.checked,
                })
              }
            />
          </label>

          <label className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <h4 className="font-medium">
                Allow Registration
              </h4>

              <p className="text-sm text-gray-500">
                Allow new customers to create accounts.
              </p>
            </div>

            <input
              type="checkbox"
              checked={settings.allowRegistration}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  allowRegistration: e.target.checked,
                })
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
}