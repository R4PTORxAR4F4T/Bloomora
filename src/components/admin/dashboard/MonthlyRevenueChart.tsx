"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: {
    month: number;
    revenue: number;
  }[];
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthlyRevenueChart({
  data,
}: Props) {
  const chartData = MONTHS.map(
    (name, index) => {
      const found = data.find(
        (item) => item.month === index + 1
      );

      return {
        month: name,
        revenue: found?.revenue ?? 0,
      };
    }
  );

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Monthly Revenue
      </h2>

      <div className="h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="4 4"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) => [
                `৳${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />

            <Bar
              dataKey="revenue"
              fill="#B78A61"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}