"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {Edit,Plus,Search,Trash2} from "lucide-react";
import categoryService from "@/src/services/category.service";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { toast } from "sonner";

interface Category {
  _id: string;

  name: string;

  description: string;

  active: boolean;

  createdAt: string;
}

export default function CategoryTable() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [filtered, setFiltered] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const keyword =
      search.toLowerCase();

    setFiltered(
      categories.filter(
        (category) =>
          category.name
            .toLowerCase()
            .includes(keyword) ||
          category.description
            .toLowerCase()
            .includes(keyword)
      )
    );
  }, [search, categories]);

  async function loadCategories() {
    try {
      setLoading(true);

      const data =
        await categoryService.getCategories();

      setCategories(data);

      setFiltered(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function openDeleteModal(
    category: Category
  ) {
    setSelectedCategory(category);

    setDeleteOpen(true);
  }

  function closeDeleteModal() {
    setDeleteOpen(false);

    setSelectedCategory(null);
  }

  async function handleDelete() {
    if (!selectedCategory) return;

    try {
      setDeleteLoading(true);

      await categoryService.deleteCategory(
        selectedCategory._id
      );

      toast.success(
        "Category deleted successfully."
      );

      closeDeleteModal();

      loadCategories();
    } catch (error) {
        console.error(error);
        toast.error("Failed to delete category.");
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
            placeholder="Search categories..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-black"
          />

        </div>

        <Link
          href="/admin/categories/create"
          className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800"
        >
          <Plus size={18} />

          New Category
        </Link>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Description
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
              (category) => (
                <tr
                  key={category._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-6 py-4 font-medium">
                    {category.name}
                  </td>

                  <td className="max-w-md truncate px-6 py-4 text-gray-600">
                    {category.description}
                  </td>

                  <td className="px-6 py-4 text-center">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        category.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {category.active
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-center gap-3">

                      <Link
                        href={`/admin/categories/edit/${category._id}`}
                        className="rounded-lg border p-2 transition hover:bg-gray-100"
                      >
                        <Edit size={18} />
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          openDeleteModal(category)
                        }
                        className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>
              )
            )}

            {!filtered.length && (
              <tr>

                <td
                  colSpan={4}
                  className="py-10 text-center text-gray-500"
                >
                  No categories found.
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

      <DeleteCategoryModal
        open={deleteOpen}
        loading={deleteLoading}
        categoryName={
          selectedCategory?.name ?? ""
        }
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />

    </section>
  );
}