import {
  LayoutDashboard,
  Package,
  Grid2X2,
  Layers,
  ShoppingBag,
  Users,
  TicketPercent,
  Settings,
} from "lucide-react";

export const ADMIN_MENU = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Grid2X2,
  },
  {
    title: "Sub Categories",
    href: "/admin/subcategories",
    icon: Layers,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Users",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Coupons",
    href: "/admin/coupons",
    icon: TicketPercent,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
] as const;