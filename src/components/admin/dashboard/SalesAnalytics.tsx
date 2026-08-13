"use client";

import {
  CalendarDays,
  CalendarRange,
  Calendar,
  CalendarClock,
  BadgeDollarSign,
} from "lucide-react";

interface Props {
  sales: {
    todayRevenue: number;

    yesterdayRevenue: number;

    thisWeekRevenue: number;

    thisMonthRevenue: number;

    thisYearRevenue: number;
  };
}

export default function SalesAnalytics({
  sales,
}: Props) {
  const cards = [
    {
      title: "Today",
      value: sales.todayRevenue,
      icon: CalendarDays,
    },
    {
      title: "Yesterday",
      value: sales.yesterdayRevenue,
      icon: CalendarClock,
    },
    {
      title: "This Week",
      value: sales.thisWeekRevenue,
      icon: CalendarRange,
    },
    {
      title: "This Month",
      value: sales.thisMonthRevenue,
      icon: Calendar,
    },
    {
      title: "This Year",
      value: sales.thisYearRevenue,
      icon: BadgeDollarSign,
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Sales Analytics
      </h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl border p-5 transition hover:shadow"
            >
              <div className="mb-4 flex items-center justify-between">
                <Icon
                  className="text-[#B78A61]"
                  size={22}
                />

                <span className="text-sm text-slate-500">
                  {card.title}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-800">
                ৳{card.value.toLocaleString()}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}