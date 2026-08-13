"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AdminLayout from "@/src/components/admin/layout/AdminLayout";
import { useAuth } from "@/src/hooks/useAuth";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "admin") {
        router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}