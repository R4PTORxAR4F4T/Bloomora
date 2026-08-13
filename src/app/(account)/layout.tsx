"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2
          className="animate-spin"
          size={36}
        />
      </div>
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <main className="">{children}</main>
      <Footer></Footer>
    </>
  );
}