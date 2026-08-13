"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import categoryService from "@/src/services/category.service";
import subCategoryService from "@/src/services/subCategory.service";

import SubCategoryGeneral from "./SubCategoryGeneral";
import SubCategoryStatus from "./SubCategoryStatus";
import SubCategorySubmit from "./SubCategorySubmit";
import { toast } from "sonner";

export interface SubCategoryFormData {
  name: string;

  category: string;

  skuPrefix: string;

  active: boolean;
}

interface Props {
  editMode?: boolean;

  subCategoryId?: string;
}

interface Category {
  _id: string;

  name: string;
}

const initialForm: SubCategoryFormData =
  {
    name: "",

    category: "",

    skuPrefix: "",

    active: true,
  };

export default function SubCategoryForm({
  editMode = false,
  subCategoryId,
}: Props) {
  const router = useRouter();

  const [form, setForm] =
    useState<SubCategoryFormData>(
      initialForm
    );

  const [loading, setLoading] =
    useState(false);

  const [categories, setCategories] =
    useState<Category[]>([]);

  function updateField<
    K extends keyof SubCategoryFormData
  >(
    key: K,
    value: SubCategoryFormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (
      editMode &&
      subCategoryId
    ) {
      loadSubCategory(
        subCategoryId
      );
    }
  }, [editMode, subCategoryId]);

  async function loadCategories() {
    try {
      const data =
        await categoryService.getCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadSubCategory(
    id: string
  ) {
    try {
      setLoading(true);

      const subCategory =
        await subCategoryService.getSubCategory(
          id
        );

      setForm({
        name: subCategory.name,

        category:
          subCategory.category?._id ??
          subCategory.category,

        skuPrefix:
          subCategory.skuPrefix,

        active:
          subCategory.active,
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
        subCategoryId
      ) {
        await subCategoryService.updateSubCategory(
          subCategoryId,
          form
        );
      } else {
        await subCategoryService.createSubCategory(
          form
        );
      }

      toast.success(
        editMode
          ? "Sub Category updated successfully."
          : "Sub Category created successfully."
      );

      router.push(
        "/admin/subcategories"
      );
    } catch (error) {
      console.error(error);

      toast.error("Failed to save sub category.");
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
      <SubCategoryGeneral
        form={form}
        categories={categories}
        updateField={updateField}
      />

      <SubCategoryStatus
        form={form}
        updateField={updateField}
      />

      <SubCategorySubmit
        loading={loading}
        editMode={editMode}
      />
    </form>
  );
}