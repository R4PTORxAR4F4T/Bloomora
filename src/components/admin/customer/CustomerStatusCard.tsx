"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import DeleteCustomerModal from "./DeleteCustomerModal";
import adminCustomerService from "@/src/services/admin-customer.service";
import { User } from "@/src/types/user";

interface Props {
  customer: User;

  refresh: () => void;
}

export default function CustomerStatusCard({
  customer,
  refresh,
}: Props) {
  const [role, setRole] = useState(customer.role);

  const [active, setActive] = useState(
    customer.active
  );

  const [deleteOpen, setDeleteOpen] =
  useState(false);

  const [deleteLoading, setDeleteLoading] =
  useState(false);

  const [loading, setLoading] =
    useState(false);

  async function saveChanges() {
    try {
      setLoading(true);

      await adminCustomerService.updateRole(
        customer._id,
        role
      );

      await adminCustomerService.updateStatus(
        customer._id,
        active
      );

      toast.success(
        "Customer updated successfully"
      );

      refresh();
    } catch (error: any) {
      toast.error(
        error.message ||
          "Failed to update customer"
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteCustomer() {
    try {
      setDeleteLoading(true);

      await adminCustomerService.deleteCustomer(
        customer._id
      );

      toast.success(
        "Customer deleted successfully"
      );

      window.location.href =
        "/admin/customers";
    } catch (error: any) {
      toast.error(
        error.message ||
          "Failed to delete customer"
      );
    } finally {
      setDeleteLoading(false);
      setDeleteOpen(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
          Customer Settings
        </h2>

      </div>

      <div className="space-y-5 p-6">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Role
          </label>

          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value as
                  | "customer"
                  | "admin"
              )
            }
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          >
            <option value="customer">
              Customer
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Account Status
          </label>

          <select
            value={
              active ? "active" : "inactive"
            }
            onChange={(e) =>
              setActive(
                e.target.value === "active"
              )
            }
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          >
            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

          </select>

        </div>

        <button
          onClick={saveChanges}
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Save Changes"}
        </button>

        <button
          onClick={() => setDeleteOpen(true)}
          className="w-full rounded-lg border border-red-600 px-4 py-3 font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
        >
          Delete Customer
        </button>

      </div>

      <DeleteCustomerModal
        open={deleteOpen}
        customerName={customer.name}
        loading={deleteLoading}
        onClose={() => setDeleteOpen(false)}
        onDelete={deleteCustomer}
      />

    </div>
  );
}