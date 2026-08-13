"use client";

import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="ml-64 flex min-h-screen flex-col">
        {/* Admin Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}