"use client";

import { useEffect, useState } from "react";

import dashboardService from "@/src/services/dashboard.service";

import { DashboardData } from "@/src/types/dashboard";

import DashboardStats from "@/src/components/admin/dashboard/DashboardStats";
import SalesAnalytics from "@/src/components/admin/dashboard/SalesAnalytics";
import RevenueChart from "@/src/components/admin/dashboard/RevenueChart";
import MonthlyRevenueChart from "@/src/components/admin/dashboard/MonthlyRevenueChart";
import OrderStatusChart from "@/src/components/admin/dashboard/OrderStatusChart";
import RecentOrders from "@/src/components/admin/dashboard/RecentOrders";
import TopProducts from "@/src/components/admin/dashboard/TopProducts";
import LowStockProducts from "@/src/components/admin/dashboard/LowStockProducts";
import TopCustomers from "@/src/components/admin/dashboard/TopCustomers";
import CategoryPerformance from "@/src/components/admin/dashboard/CategoryPerformance";
import TopRatedProducts from "@/src/components/admin/dashboard/TopRatedProducts";
import NewArrivals from "@/src/components/admin/dashboard/NewArrivals";

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data =
          await dashboardService.getDashboard();

        setDashboard(data);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="p-8">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardStats overview={dashboard.overview} />

      <SalesAnalytics sales={dashboard.sales} />

      <RevenueChart data={dashboard.sales.last30Days} />

      <MonthlyRevenueChart data={dashboard.sales.monthlyRevenue} />

      <OrderStatusChart overview={dashboard.overview} />

      <RecentOrders orders={dashboard.recentOrders} />

      <TopProducts products={dashboard.products.topSelling} />

      <LowStockProducts products={dashboard.products.lowStock} />

      <TopCustomers customers={dashboard.customers.topCustomers} />

      <CategoryPerformance categories={dashboard.products.categoryPerformance} />

      <TopRatedProducts products={dashboard.products.topRated} />

      <NewArrivals products={dashboard.products.newArrivals} />

    </div>
  );
}