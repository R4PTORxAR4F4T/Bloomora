"use client";

import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/src/hooks/useAuth";

export default function LoginButton() {
  const { login, loading } = useAuth();

  return (
    <button
      onClick={login}
      disabled={loading}
      className="flex w-full items-center justify-center gap-3 rounded-xl border bg-white px-5 py-4 text-lg font-medium shadow transition hover:shadow-lg disabled:opacity-50"
    >
      <FcGoogle size={28} />

      {loading ? "Signing In..." : "Continue with Google"}
    </button>
  );
}