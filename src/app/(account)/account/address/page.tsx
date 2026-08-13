"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import addressService from "@/src/services/address.service";
import AddressCard from "@/src/components/account/address/AddressCard";
import { Address } from "@/src/types/user";

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAddresses() {
    try {
      setLoading(true);

      const data = await addressService.getAddresses();

      setAddresses(data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to load addresses."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAddresses();
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-6 py-28">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-light">
          My Addresses
        </h1>

        <Link
          href="/account/address/new"
          className="flex items-center gap-2 rounded-lg bg-[#B78A61] px-5 py-3 text-white"
        >
          <Plus size={18} />
          Add Address
        </Link>

      </div>

      {loading ? (
        <div className="mt-10 text-center">
          Loading...
        </div>
      ) : addresses.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed p-10 text-center text-gray-500">
          No address added yet.
        </div>
      ) : (
        <div className="mt-10 grid gap-5">

          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              onRefresh={loadAddresses}
            />
          ))}

        </div>
      )}

    </main>
  );
}