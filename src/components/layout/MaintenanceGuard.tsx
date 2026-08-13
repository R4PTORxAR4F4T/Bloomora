"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import MaintenancePage from "./MaintenancePage";
import { usePublicSettings } from "@/src/context/PublicSettingsContext";

interface Props {
  children: React.ReactNode;
}

export default function MaintenanceGuard({
  children,
}: Props) {
  const pathname = usePathname();
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  const { settings, loading } =
    usePublicSettings();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // Allow admins to access the entire website
  if (isAdmin) {
    return <>{children}</>;
  }

  // Allow authentication pages
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  ) {
    return <>{children}</>;
  }

  // Show maintenance page
  if (settings?.maintenanceMode) {
    return <MaintenancePage />;
  }

  return <>{children}</>;
}