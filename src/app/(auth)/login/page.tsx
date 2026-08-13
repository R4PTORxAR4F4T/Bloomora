"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import LoginButton from "@/src/components/auth/LoginButton";
import { useAuth } from "@/src/hooks/useAuth";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF7F2]">
        <div className="text-lg text-[#8C6A56]">Loading...</div>
      </div>
    );
  }

  return (
    <section className="flex min-h-screen bg-[#FBF7F2]">
      {/* Left */}
      <div className="hidden w-1/2 lg:block">
        <Image
          src="/images/hero-jewelry.png"
          alt="Bloomora"
          width={900}
          height={1200}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {/* Right */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
          <p className="text-sm uppercase tracking-[6px] text-[#B78A61]">
            Welcome to
          </p>

          <h1 className="mt-3 text-5xl font-light text-[#3D2A22]">
            Bloomora
          </h1>

          <p className="mt-6 leading-8 text-gray-500">
            Sign in with your Google account to continue shopping,
            save your wishlist, place orders and manage your profile.
          </p>

          <div className="mt-10">
            <LoginButton />
          </div>

          <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500">
            By continuing you agree to our Terms &
            Conditions and Privacy Policy.
          </div>
        </div>
      </div>
    </section>
  );
}