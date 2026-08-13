"use client";

import { useAuth } from "@/src/hooks/useAuth";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="rounded-lg border px-5 py-3 transition hover:bg-gray-100"
    >
      Logout
    </button>
  );
}