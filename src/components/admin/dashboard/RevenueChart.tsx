"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: {
    date: string;
    revenue: number;
  }[];
}

export default function RevenueChart({
  data,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Revenue (Last 30 Days)
      </h2>

      <div className="h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
            />

            <YAxis />

            <Tooltip
              formatter={(value) => [
                `৳${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#B78A61"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}