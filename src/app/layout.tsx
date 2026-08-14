import type { Metadata } from "next";
import "./globals.css";

import AuthProvider from "../providers/AuthProvider";
import { CartProvider } from "../providers/CartProvider";
import { WishlistProvider } from "../providers/WishlistProvider";
import { Toaster } from "sonner";

import MaintenanceGuard from "@/src/components/layout/MaintenanceGuard";
import { PublicSettingsProvider } from "../context/PublicSettingsContext";

export const metadata: Metadata = {
  title: {
    default: "Bloomora",
    template: "%s | Bloomora",
  },
  description:
    "Handcrafted Polymer Clay Flower Jewelry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full" suppressHydrationWarning>

        <AuthProvider>

          <CartProvider>

            <WishlistProvider>

              <PublicSettingsProvider>

                <MaintenanceGuard>

                  {children}

                </MaintenanceGuard>

              </PublicSettingsProvider>

            </WishlistProvider>

          </CartProvider>

        </AuthProvider>

        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={3000}
        />

      </body>
    </html>
  );
}