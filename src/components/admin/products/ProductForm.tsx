"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import adminProductService from "@/src/services/admin-product.service";
import categoryService from "@/src/services/category.service";
import subCategoryService from "@/src/services/subCategory.service";

import ProductGeneral from "./ProductGeneral";
import ProductCategory from "./ProductCategory";
import ProductPricing from "./ProductPricing";
import ProductInventory from "./ProductInventory";
import ProductImages from "./ProductImages";
import ProductTags from "./ProductTags";
import ProductStatus from "./ProductStatus";
import ProductSubmit from "./ProductSubmit";
import { toast } from "sonner";

import {
  ProductDimensions,
  ProductImage,
} from "@/src/types/product";

export interface ProductFormData {
  name: string;

  description: string;

  category: string;

  subCategory: string;

  price: number;

  discountPrice: number;

  stock: number;

  images: ProductImage[];

  materials: string[];

  colors: string[];

  dimensions: ProductDimensions;

  tags: string[];

  careInstructions: string;

  featured: boolean;

  bestSeller: boolean;

  newArrival: boolean;

  active: boolean;
}

interface Props {
  editMode?: boolean;

  productId?: string;
}

const initialForm: ProductFormData = {
  name: "",

  description: "",

  category: "",

  subCategory: "",

  price: 0,

  discountPrice: 0,

  stock: 0,

  images: [],

  materials: [],

  colors: [],

  dimensions: {
    width: 0,
    height: 0,
    unit: "mm",
  },

  tags: [],

  careInstructions: "",

  featured: false,

  bestSeller: false,

  newArrival: true,

  active: true,
};

export default function ProductForm({
  editMode = false,
  productId,
}: Props) {
  const router = useRouter();

  const [form, setForm] =
    useState<ProductFormData>(initialForm);

  const [loading, setLoading] =
    useState(false);

  const [categories, setCategories] =
    useState<any[]>([]);

  const [
    subCategories,
    setSubCategories,
  ] = useState<any[]>([]);

  function updateField<
    K extends keyof ProductFormData
  >(
    key: K,
    value: ProductFormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function loadCategories() {
    try {
      const data =
        await categoryService.getCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadSubCategories(
    categoryId: string
  ) {
    try {
      const data =
        await subCategoryService.getSubCategories(
          categoryId
        );

      setSubCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (!form.category) {
      setSubCategories([]);
      return;
    }

    loadSubCategories(form.category);
  }, [form.category]);

  useEffect(() => {
    if (editMode && productId) {
      loadProduct(productId);
    }
  }, [editMode, productId]);

  async function loadProduct(id: string) {
    try {
      setLoading(true);

      const product =
        await adminProductService.getProduct(
          id
        );

      setForm({
        name: product.name,

        description:
          product.description,

        category:
          product.category?._id ??
          product.category ??
          "",

        subCategory:
          product.subCategory?._id ??
          product.subCategory ??
          "",

        price: product.price,

        discountPrice:
          product.discountPrice ?? 0,

        stock: product.stock,

        images:
          product.images ?? [],

        materials:
          product.materials ?? [],

        colors:
          product.colors ?? [],

        dimensions:
          product.dimensions ?? {
            width: 0,
            height: 0,
            unit: "mm",
          },

        tags:
          product.tags ?? [],

        careInstructions:
          product.careInstructions ??
          "",

        featured:
          product.featured,

        bestSeller:
          product.bestSeller,

        newArrival:
          product.newArrival,

        active:
          product.active,
      });

      if (product.category) {
        await loadSubCategories(
          product.category._id ??
            product.category
        );
      }
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

      if (editMode && productId) {
        await adminProductService.updateProduct(
          productId,
          form
        );
      } else {
        await adminProductService.createProduct(
          form
        );
      }
      toast.success(
        editMode
          ? "Product updated successfully."
          : "Product created successfully."
      );

      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      
      toast.error("Failed to save product.");
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
      <ProductGeneral
        form={form}
        updateField={updateField}
      />

      <ProductCategory
        form={form}
        updateField={updateField}
        categories={categories}
        subCategories={subCategories}
      />

      <ProductPricing
        form={form}
        updateField={updateField}
      />

      <ProductInventory
        form={form}
        updateField={updateField}
      />

      <ProductImages
        form={form}
        updateField={updateField}
      />

      <ProductTags
        form={form}
        updateField={updateField}
      />

      <ProductStatus
        form={form}
        updateField={updateField}
      />

      <ProductSubmit
        loading={loading}
        editMode={editMode}
      />
    </form>
  );
}