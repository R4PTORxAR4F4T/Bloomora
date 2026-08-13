"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import AddressForm from "@/src/components/account/address/AddressForm";
import addressService from "@/src/services/address.service";
import { Address } from "@/src/types/user";

export default function NewAddressPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(address: Address) {
    try {
      setLoading(true);

      await addressService.addAddress(address);

      toast.success("Address added successfully.");

      router.push("/account/address");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to add address."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-28">

      <h1 className="mb-10 text-4xl font-light">
        Add Address
      </h1>

      <div className="rounded-xl border bg-white p-8 shadow-sm">

        <AddressForm
          loading={loading}
          onSubmit={handleSubmit}
        />

      </div>

    </main>
  );
}