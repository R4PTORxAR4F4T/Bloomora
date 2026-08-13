"use client";

import Link from "next/link";

import { Search, Plus } from "lucide-react";

interface Props {
  search: string;

  onSearchChange: (
    value: string
  ) => void;
}

export default function ProductToolbar({
  search,
  onSearchChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      {/* Left */}

      <div className="relative w-full md:max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          placeholder="Search products..."
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-gray-200
            bg-white
            py-3
            pl-11
            pr-4
            outline-none
            transition
            focus:border-[#B78A61]
            focus:ring-2
            focus:ring-[#B78A61]/20
          "
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        <Link
          href="/admin/products/new"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-[#B78A61]
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:bg-[#a77952]
          "
        >
          <Plus size={18} />

          Add Product
        </Link>

      </div>

    </div>
  );
}