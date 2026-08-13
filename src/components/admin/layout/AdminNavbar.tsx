"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, LogOut, User } from "lucide-react";

import { useAuth } from "@/src/hooks/useAuth";

export default function AdminNavbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="flex items-center gap-3"
          >
            <img
              src="/logo/bloomora.png"
              alt="Bloomora"
              className="h-10 w-auto"
            />

            <div>
              <h1 className="text-lg font-semibold text-slate-800">
                Bloomora Admin
              </h1>

              <p className="text-xs text-slate-500">
                Management Panel
              </p>
            </div>
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          {/* Notification */}
          <button className="relative rounded-full p-2 transition hover:bg-slate-100">
            <Bell
              size={22}
              className="text-slate-700"
            />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full border-2 border-amber-500"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white">
                <User size={18} />
              </div>
            )}

            <div className="hidden md:block">
              <p className="font-medium text-slate-800">
                {user?.name}
              </p>

              <p className="text-xs text-slate-500">
                Administrator
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}