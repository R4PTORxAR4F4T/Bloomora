"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  Pencil,
  Trash2,
  Star,
} from "lucide-react";

import addressService from "@/src/services/address.service";
import { Address } from "@/src/types/user";

interface Props {
  address: Address;

  onRefresh: () => void;
}

export default function AddressCard({
  address,
  onRefresh,
}: Props) {
  async function handleDelete() {
    if (
      !confirm(
        "Delete this address?"
      )
    ) {
      return;
    }

    try {
      await addressService.deleteAddress(
        address._id!
      );

      toast.success(
        "Address deleted."
      );

      onRefresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete address."
      );
    }
  }

  async function handleDefault() {
    try {
      await addressService.setDefaultAddress(
        address._id!
      );

      toast.success(
        "Default address updated."
      );

      onRefresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed."
      );
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-3">

            <h3 className="text-lg font-semibold">
              {address.label}
            </h3>

            {address.isDefault && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Default
              </span>
            )}

          </div>

          <p className="mt-3">
            {address.receiverName}
          </p>

          <p>{address.phone}</p>

          <p className="mt-2 text-gray-600">

            {address.address}

            <br />

            {address.area},{" "}
            {address.district},{" "}
            {address.division}

            <br />

            {address.postalCode}

          </p>

        </div>

        <div className="flex gap-2">

          {!address.isDefault && (
            <button
              onClick={handleDefault}
              className="rounded-lg border p-2 hover:bg-gray-100"
              title="Set Default"
            >
              <Star size={18} />
            </button>
          )}

          <Link
            href={`/account/address/edit/${address._id}`}
            className="rounded-lg border p-2 hover:bg-gray-100"
          >
            <Pencil size={18} />
          </Link>

          <button
            onClick={handleDelete}
            className="rounded-lg border p-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}