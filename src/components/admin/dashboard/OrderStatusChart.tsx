"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { DashboardOverview } from "@/src/types/dashboard";

interface Props {
  overview: DashboardOverview;
}

const COLORS = [
  "#EAB308", // Pending
  "#3B82F6", // Processing
  "#8B5CF6", // Packed
  "#06B6D4", // Shipped
  "#22C55E", // Delivered
  "#EF4444", // Cancelled
  "#64748B", // Returned
];

export default function OrderStatusChart({
  overview,
}: Props) {
  const data = [
    {
      name: "Pending",
      value: overview.pendingOrders,
    },
    {
      name: "Processing",
      value: overview.processingOrders,
    },
    {
      name: "Packed",
      value: overview.packedOrders,
    },
    {
      name: "Shipped",
      value: overview.shippedOrders,
    },
    {
      name: "Delivered",
      value: overview.deliveredOrders,
    },
    {
      name: "Cancelled",
      value: overview.cancelledOrders,
    },
    {
      name: "Returned",
      value: overview.returnedOrders,
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Order Status
      </h2>

      <div className="h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              innerRadius={60}
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}