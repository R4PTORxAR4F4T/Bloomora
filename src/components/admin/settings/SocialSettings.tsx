"use client";

import { useSettings } from "@/src/context/SettingsContext";

export default function SocialSettings() {
  const { settings, setSettings } = useSettings();

  if (!settings) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Social Media
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Configure your store's social media links.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Facebook
          </label>

          <input
            type="url"
            value={settings.facebook}
            onChange={(e) =>
              setSettings({
                ...settings,
                facebook: e.target.value,
              })
            }
            placeholder="https://facebook.com/bloomora"
            className="w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Instagram
          </label>

          <input
            type="url"
            value={settings.instagram}
            onChange={(e) =>
              setSettings({
                ...settings,
                instagram: e.target.value,
              })
            }
            placeholder="https://instagram.com/bloomora"
            className="w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Twitter (X)
          </label>

          <input
            type="url"
            value={settings.twitter}
            onChange={(e) =>
              setSettings({
                ...settings,
                twitter: e.target.value,
              })
            }
            placeholder="https://x.com/bloomora"
            className="w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            YouTube
          </label>

          <input
            type="url"
            value={settings.youtube}
            onChange={(e) =>
              setSettings({
                ...settings,
                youtube: e.target.value,
              })
            }
            placeholder="https://youtube.com/@bloomora"
            className="w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}