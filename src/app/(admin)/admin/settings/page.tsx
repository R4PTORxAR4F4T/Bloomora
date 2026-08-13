"use client";

import { Save } from "lucide-react";
import { toast } from "sonner";

import GeneralSettings from "@/src/components/admin/settings/GeneralSettings";
import StoreSettings from "@/src/components/admin/settings/StoreSettings";
import ContactSettings from "@/src/components/admin/settings/ContactSettings";
import SocialSettings from "@/src/components/admin/settings/SocialSettings";
import ShippingSettings from "@/src/components/admin/settings/ShippingSettings";
import PaymentSettings from "@/src/components/admin/settings/PaymentSettings";
import SeoSettings from "@/src/components/admin/settings/SeoSettings";

import {
  SettingsProvider,
  useSettings,
} from "@/src/context/SettingsContext";

function SettingsContent() {
  const { save, loading } = useSettings();

  async function handleSave() {
    try {
      await save();

      toast.success(
        "Settings updated successfully."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update settings."
      );
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Store Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your Bloomora store configuration.
        </p>

      </div>

      <GeneralSettings />

      <StoreSettings />

      <ContactSettings />

      <SocialSettings />

      <ShippingSettings />

      <PaymentSettings />

      <SeoSettings />

      <div className="flex justify-end border-t pt-8">

        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-lg bg-black px-8 py-3 text-white transition hover:bg-gray-800"
        >
          <Save size={18} />

          Save All Changes
        </button>

      </div>

    </div>
  );
}

export default function SettingsPage() {
  return (
    <SettingsProvider>
      <SettingsContent />
    </SettingsProvider>
  );
}