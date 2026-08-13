"use client";

interface Props {
  open: boolean;
  customerName: string;
  loading: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteCustomerModal({
  open,
  customerName,
  loading,
  onClose,
  onDelete,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

        <div className="border-b px-6 py-4">

          <h2 className="text-xl font-bold text-red-600">
            Delete Customer
          </h2>

        </div>

        <div className="space-y-4 p-6">

          <p>
            Are you sure you want to delete
            <strong> {customerName}</strong>?
          </p>

          <p className="text-sm text-red-600">
            This action cannot be undone.
          </p>

        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading
              ? "Deleting..."
              : "Delete Customer"}
          </button>

        </div>

      </div>

    </div>
  );
}