"use client";

import { use } from "react";

import ProductForm from "@/src/components/admin/products/ProductForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function EditProductPage({
  params,
}: Props) {
  const { id } = use(params);

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Product
        </h1>

        <p className="mt-2 text-gray-500">
          Update an existing product.
        </p>

      </div>

      <ProductForm
        editMode
        productId={id}
      />

    </div>
  );
}