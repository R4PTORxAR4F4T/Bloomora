"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

import AddressForm from "@/src/components/account/address/AddressForm";
import addressService from "@/src/services/address.service";
import { Address } from "@/src/types/user";

export default function EditAddressPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(false);

  const [address, setAddress] =
    useState<Address>();

  useEffect(() => {
    async function loadAddress() {
      try {
        const addresses =
          await addressService.getAddresses();

        const current = addresses.find(
          (item) => item._id === id
        );

        if (!current) {
          toast.error("Address not found.");

          router.push("/account/address");

          return;
        }

        setAddress(current);
      } catch {
        toast.error(
          "Failed to load address."
        );
      }
    }

    loadAddress();
  }, [id, router]);

  async function handleSubmit(
    data: Address
  ) {
    try {
      setLoading(true);

      await addressService.updateAddress(
        id,
        data
      );

      toast.success(
        "Address updated successfully."
      );

      router.push("/account/address");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to update address."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!address) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-28">
        Loading...
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-28">

      <h1 className="mb-10 text-4xl font-light">
        Edit Address
      </h1>

      <div className="rounded-xl border bg-white p-8 shadow-sm">

        <AddressForm
          initialValues={address}
          loading={loading}
          onSubmit={handleSubmit}
        />

      </div>

    </main>
  );
}