"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import settingsService from "@/src/services/settings.service";
import { StoreSettings } from "@/src/types/settings";

interface SettingsContextType {
  settings: StoreSettings | null;

  loading: boolean;

  setSettings: React.Dispatch<
    React.SetStateAction<StoreSettings | null>
  >;

  refresh: () => Promise<void>;

  save: () => Promise<void>;
}

const SettingsContext =
  createContext<SettingsContextType | null>(
    null
  );

export function SettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [settings, setSettings] =
    useState<StoreSettings | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function refresh() {
    try {
      setLoading(true);

      const data =
        await settingsService.getSettings();

      setSettings(data);
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    if (!settings) return;

    await settingsService.updateSettings(
      settings
    );
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        setSettings,
        refresh,
        save,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context =
    useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider"
    );
  }

  return context;
}