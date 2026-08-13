"use client";

import { Search } from "lucide-react";
import { useSettings } from "@/src/context/SettingsContext";

export default function SeoSettings() {
  const { settings, setSettings } = useSettings();

  if (!settings) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Search
          size={22}
          className="text-gray-700"
        />

        <div>
          <h2 className="text-xl font-semibold">
            SEO Settings
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Configure your website metadata for search engines.
          </p>
        </div>
      </div>

      <div className="space-y-6">

        <div>
          <label className="mb-2 block text-sm font-medium">
            SEO Title
          </label>

          <input
            type="text"
            value={settings.seoTitle}
            onChange={(e) =>
              setSettings({
                ...settings,
                seoTitle: e.target.value,
              })
            }
            className="w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            SEO Description
          </label>

          <textarea
            rows={4}
            value={settings.seoDescription}
            onChange={(e) =>
              setSettings({
                ...settings,
                seoDescription: e.target.value,
              })
            }
            className="w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            SEO Keywords
          </label>

          <input
            type="text"
            value={settings.seoKeywords}
            onChange={(e) =>
              setSettings({
                ...settings,
                seoKeywords: e.target.value,
              })
            }
            placeholder="jewelry, rings, necklace"
            className="w-full rounded-lg border px-4 py-3 focus:border-black focus:outline-none"
          />
        </div>

      </div>
    </div>
  );
}