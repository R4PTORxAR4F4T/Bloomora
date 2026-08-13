"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_MENU } from "@/src/constants/admin-menu";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-slate-800">
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide"
        >
          Bloomora
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex flex-col gap-1 px-3">
        {ADMIN_MENU.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/admin" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all
                ${
                  active
                    ? "bg-amber-500 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}