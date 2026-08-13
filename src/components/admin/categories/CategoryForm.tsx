"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import categoryService from "@/src/services/category.service";
import CategoryGeneral from "./CategoryGeneral";
import CategoryStatus from "./CategoryStatus";
import CategorySubmit from "./CategorySubmit";
import { toast } from "sonner";

export interface CategoryFormData {
  name: string;
  description: string;
  active: boolean;
}

interface Props {
  editMode?: boolean;
  categoryId?: string;
}

const initialForm: CategoryFormData = {
  name: "",
  description: "",
  active: true,
};

export default function CategoryForm({
  editMode = false,
  categoryId,
}: Props) {
  const router = useRouter();

  const [form, setForm] =
    useState<CategoryFormData>(
      initialForm
    );

  const [loading, setLoading] =
    useState(false);

  function updateField<
    K extends keyof CategoryFormData
  >(
    key: K,
    value: CategoryFormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  useEffect(() => {
    if (
      editMode &&
      categoryId
    ) {
      loadCategory(categoryId);
    }
  }, [editMode, categoryId]);

  async function loadCategory(
    id: string
  ) {
    try {
      setLoading(true);

      const category =
        await categoryService.getCategory(
          id
        );

      setForm({
        name: category.name,
        description:
          category.description ?? "",
        active: category.active,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      if (
        editMode &&
        categoryId
      ) {
        await categoryService.updateCategory(
          categoryId,
          form
        );
      } else {
        await categoryService.createCategory(
          form
        );
      }

      toast.success(
        editMode
          ? "Category updated successfully."
          : "Category created successfully."
      );

      router.push(
        "/admin/categories"
      );
    } catch (error) {
      console.error(error);

      toast.error("Failed to save category.")

    } finally {
      setLoading(false);
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
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-7xl space-y-6 pb-10"
    >
      <CategoryGeneral
        form={form}
        updateField={updateField}
      />

      <CategoryStatus
        form={form}
        updateField={updateField}
      />

      <CategorySubmit
        loading={loading}
        editMode={editMode}
      />
    </form>
  );
}