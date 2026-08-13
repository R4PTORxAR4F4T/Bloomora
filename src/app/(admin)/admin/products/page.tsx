"use client";

import { useEffect, useState } from "react";

import ProductToolbar from "@/src/components/admin/products/ProductToolbar";
import ProductTable from "@/src/components/admin/products/ProductTable";

import adminProductService from "@/src/services/admin-product.service";

import { ProductSummary } from "@/src/types/dashboard";
import { toast } from "sonner";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductSummary[]>([]);

  const [filteredProducts, setFilteredProducts] =
    useState<ProductSummary[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  // ==========================
  // Load Products
  // ==========================

  async function loadProducts() {
    try {
      setLoading(true);

      const data =
        await adminProductService.getProducts();

      setProducts(data);

      setFilteredProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // ==========================
  // Search
  // ==========================

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.sku
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [search, products]);

  // ==========================
  // Delete
  // ==========================

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await adminProductService.deleteProduct(id);
 
      toast.success(
        "Product deleted successfully."
      );
      loadProducts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product.");
    }
  }

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="p-8">
        Loading products...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Title */}

      <div>
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <p className="text-gray-500">
          Manage all products
        </p>
      </div>

      {/* Toolbar */}

      <ProductToolbar
        search={search}
        onSearchChange={setSearch}
      />

      {/* Table */}

      <ProductTable
        products={filteredProducts}
        onDelete={handleDelete}
      />

    </div>
  );
}