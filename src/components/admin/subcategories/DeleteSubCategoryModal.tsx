"use client";

interface Props {
  open: boolean;

  loading: boolean;

  categoryName: string;

  onClose: () => void;

  onConfirm: () => void;
}

export default function DeleteSubCategoryModal({
  open,
  loading,
  categoryName,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

        <div className="border-b p-6">

          <h2 className="text-xl font-semibold">
            Delete Sub Category
          </h2>

        </div>

        <div className="space-y-3 p-6">

          <p className="text-gray-600">
            Are you sure you want to delete this sub category?
          </p>

          <div className="rounded-lg bg-gray-100 p-3 font-medium">
            {categoryName}
          </div>

          <p className="text-sm text-red-600">
            This action cannot be undone.
          </p>

        </div>

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border px-5 py-2 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}