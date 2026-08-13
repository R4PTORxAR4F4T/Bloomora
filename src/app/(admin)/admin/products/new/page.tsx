import ProductForm from "@/src/components/admin/products/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Add New Product
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new product for your store.
        </p>

      </div>

      <ProductForm />

    </div>
  );
}