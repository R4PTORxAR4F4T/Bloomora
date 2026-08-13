"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Plus, Search, Trash2 }from "lucide-react";
import subCategoryService from "@/src/services/subCategory.service";
import DeleteSubCategoryModal from "./DeleteSubCategoryModal";
import { toast } from "sonner";

interface Category {
  _id: string;

  name: string;
}

interface SubCategory {
  _id: string;

  name: string;

  skuPrefix: string;

  active: boolean;

  category: Category;
}

export default function SubCategoryTable() {
  const [subCategories, setSubCategories] =
    useState<SubCategory[]>([]);

  const [filtered, setFiltered] =
    useState<SubCategory[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  useEffect(() => {
    loadSubCategories();
  }, []);

  useEffect(() => {
    const keyword =
      search.toLowerCase();

    setFiltered(
      subCategories.filter(
        (subCategory) =>
          subCategory.name
            .toLowerCase()
            .includes(keyword) ||
          subCategory.category.name
            .toLowerCase()
            .includes(keyword) ||
          subCategory.skuPrefix
            .toLowerCase()
            .includes(keyword)
      )
    );
  }, [search, subCategories]);

  async function loadSubCategories() {
    try {
      setLoading(true);

      const data =
        await subCategoryService.getSubCategories();

      setSubCategories(data);

      setFiltered(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function openDeleteModal(
    subCategory: SubCategory
  ) {
    setSelectedSubCategory(
      subCategory
    );

    setDeleteOpen(true);
  }

  function closeDeleteModal() {
    setDeleteOpen(false);

    setSelectedSubCategory(null);
  }

  async function handleDelete() {
    if (!selectedSubCategory)
      return;

    try {
      setDeleteLoading(true);

      await subCategoryService.deleteSubCategory(
        selectedSubCategory._id
      );

      toast.success(
        "Sub Category deleted successfully."
      );

      closeDeleteModal();

      loadSubCategories();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete sub category.");
    } finally {
      setDeleteLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <section className="rounded-xl border bg-white shadow-sm">

        {/* Header */}

        <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">

          <div className="relative w-full md:max-w-sm">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              placeholder="Search..."
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-black"
            />

          </div>

          <Link
            href="/admin/subcategories/create"
            className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800"
          >
            <Plus size={18} />

            New Sub Category
          </Link>

        </div>

        {/* Table */}

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Name
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  SKU Prefix
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.map(
                (subCategory) => (
                  <tr
                    key={
                      subCategory._id
                    }
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">
                      {
                        subCategory
                          .category.name
                      }
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {
                        subCategory.name
                      }
                    </td>

                    <td className="px-6 py-4 text-center font-mono">
                      {
                        subCategory.skuPrefix
                      }
                    </td>

                    <td className="px-6 py-4 text-center">

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          subCategory.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {subCategory.active
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-center gap-3">

                        <Link
                          href={`/admin/subcategories/edit/${subCategory._id}`}
                          className="rounded-lg border p-2 transition hover:bg-gray-100"
                        >
                          <Edit
                            size={18}
                          />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            openDeleteModal(
                              subCategory
                            )
                          }
                          className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2
                            size={18}
                          />
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

              {!filtered.length && (
                <tr>

                  <td
                    colSpan={5}
                    className="py-10 text-center text-gray-500"
                  >
                    No sub categories found.
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </section>

      <DeleteSubCategoryModal
        open={deleteOpen}
        loading={deleteLoading}
        categoryName={
          selectedSubCategory?.name ??
          ""
        }
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </>
  );
}