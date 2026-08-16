"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Bell,
  Clock,
  LogOut,
  Menu,
  PackageX,
  ShoppingBag,
  User,
} from "lucide-react";

import { useAuth } from "@/src/hooks/useAuth";
import dashboardService from "@/src/services/dashboard.service";
import { DashboardData } from "@/src/types/dashboard";

interface NotificationItem {
  id: string;
  href: string;
  title: string;
  subtitle: string;
  icon: typeof Bell;
  tone: "danger" | "warning" | "info";
}

const TONE_STYLES: Record<
  NotificationItem["tone"],
  string
> = {
  danger: "bg-red-100 text-red-600",
  warning: "bg-amber-100 text-amber-600",
  info: "bg-blue-100 text-blue-600",
};

function timeAgo(dateString: string) {
  const diffMs =
    Date.now() - new Date(dateString).getTime();

  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function buildNotifications(
  data: DashboardData
): NotificationItem[] {
  const items: NotificationItem[] = [];

  const outOfStock = data.products?.outOfStock ?? 0;
  const lowStock = data.products?.lowStock ?? [];
  const pendingOrders = data.overview?.pendingOrders ?? 0;

  if (outOfStock > 0) {
    items.push({
      id: "out-of-stock",
      href: "/admin/products",
      title: `${outOfStock} product${
        outOfStock > 1 ? "s are" : " is"
      } out of stock`,
      subtitle: "Restock soon to avoid missed sales",
      icon: PackageX,
      tone: "danger",
    });
  }

  if (lowStock.length > 0) {
    items.push({
      id: "low-stock",
      href: "/admin/products",
      title: `${lowStock.length} product${
        lowStock.length > 1 ? "s" : ""
      } running low`,
      subtitle: lowStock
        .slice(0, 2)
        .map((p) => p.name)
        .join(", "),
      icon: AlertTriangle,
      tone: "warning",
    });
  }

  if (pendingOrders > 0) {
    items.push({
      id: "pending-orders",
      href: "/admin/orders",
      title: `${pendingOrders} order${
        pendingOrders > 1 ? "s" : ""
      } awaiting confirmation`,
      subtitle: "Review and confirm to start fulfillment",
      icon: Clock,
      tone: "warning",
    });
  }

  (data.recentOrders ?? []).slice(0, 5).forEach((order) => {
    items.push({
      id: order._id,
      href: `/admin/orders/${order._id}`,
      title: `New order #${order.orderNumber}`,
      subtitle: `${
        order.user?.name || "Customer"
      } · ৳${order.total} · ${timeAgo(order.createdAt)}`,
      icon: ShoppingBag,
      tone: "info",
    });
  });

  return items;
}

interface Props {
  onMenuClick: () => void;
}

export default function AdminNavbar({ onMenuClick }: Props) {
  const { user, logout } = useAuth();

  const [notifOpen, setNotifOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<
    NotificationItem[]
  >([]);

  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await dashboardService.getDashboard();
        setNotifications(buildNotifications(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setNotifOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={onMenuClick}
            aria-label="Open menu"
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          >
            <Menu size={22} />
          </button>

          <Link
            href="/admin"
            className="flex items-center gap-3"
          >
            <img
              src="/logo/bloomora.png"
              alt="Bloomora"
              className="h-9 w-auto md:h-10"
            />

            <div className="hidden sm:block">
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
        <div className="flex items-center gap-2 md:gap-5">
          {/* Notification */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen((v) => !v)}
              aria-label="Notifications"
              aria-expanded={notifOpen}
              className="relative rounded-full p-2 transition hover:bg-slate-100"
            >
              <Bell
                size={22}
                className="text-slate-700"
              />

              {notifications.length > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
                  {notifications.length > 9
                    ? "9+"
                    : notifications.length}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border bg-white shadow-xl">
                <div className="border-b px-4 py-3">
                  <p className="font-semibold text-slate-800">
                    Notifications
                  </p>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {loading ? (
                    <div className="px-4 py-8 text-center text-sm text-slate-400">
                      Loading...
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-slate-400">
                      You're all caught up 🎉
                    </div>
                  ) : (
                    notifications.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() =>
                            setNotifOpen(false)
                          }
                          className="flex items-start gap-3 border-b px-4 py-3 transition last:border-b-0 hover:bg-slate-50"
                        >
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                              TONE_STYLES[item.tone]
                            }`}
                          >
                            <Icon size={16} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-800">
                              {item.title}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                              {item.subtitle}
                            </p>
                          </div>
                        </Link>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

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
