"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import publicSettingsService, {
  PublicSettings,
} from "@/src/services/public-settings.service";

interface ContextType {
  settings: PublicSettings | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const PublicSettingsContext =
  createContext<ContextType>({
    settings: null,
    loading: true,
    refresh: async () => {},
  });

export function PublicSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] =
    useState<PublicSettings | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function refresh() {
    try {
      const data =
        await publicSettingsService.getSettings();

      setSettings(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <PublicSettingsContext.Provider
      value={{
        settings,
        loading,
        refresh,
      }}
    >
      {children}
    </PublicSettingsContext.Provider>
  );
}

export function usePublicSettings() {
  return useContext(PublicSettingsContext);
}