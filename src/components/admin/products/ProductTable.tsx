"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import { ProductSummary } from "@/src/types/dashboard";

interface Props {
  products: ProductSummary[];

  onDelete: (id: string) => void;
}

export default function ProductTable({
  products,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr className="text-left text-sm text-gray-600">

              <th className="px-6 py-4">
                Product
              </th>

              <th className="px-4 py-4">
                Category
              </th>

              <th className="px-4 py-4">
                Price
              </th>

              <th className="px-4 py-4">
                Stock
              </th>

              <th className="px-4 py-4">
                Sold
              </th>

              <th className="px-4 py-4">
                Status
              </th>

              <th className="px-6 py-4 text-right">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((product,index) => {

              const image =
                product.images?.[0]?.url ||
                "/images/collections/default-placeholder.png";

              return (

                <tr
                  key={product._id}
                  className="border-t"
                >

                  {/* Product */}

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-4">

                      <Image
                        src={image}
                        alt={
                          product.name || ""
                        }
                        loading="eager"
                        priority={index === 0}
                        width={70}
                        height={70}
                        className="rounded-xl border object-cover"
                      />

                      <div>

                        <h3 className="font-medium">
                          {product.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {product.sku}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">

                          {product.featured && (
                            <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                              Featured
                            </span>
                          )}

                          {product.bestSeller && (
                            <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                              Best Seller
                            </span>
                          )}

                          {product.newArrival && (
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                              New
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                  </td>

                  {/* Category */}

                  <td className="px-4 py-4">

                    <div>

                      <p className="font-medium">
                        {product.category?.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {product.subCategory?.name}
                      </p>

                    </div>

                  </td>

                  {/* Price */}

                  <td className="px-4 py-4">

                    {product.discountPrice > 0 ? (

                      <div>

                        <p className="font-semibold text-[#B78A61]">
                          ৳
                          {product.discountPrice.toLocaleString()}
                        </p>

                        <p className="text-sm text-gray-400 line-through">
                          ৳
                          {product.price.toLocaleString()}
                        </p>

                      </div>

                    ) : (

                      <span className="font-semibold">
                        ৳
                        {product.price.toLocaleString()}
                      </span>

                    )}

                  </td>

                  {/* Stock */}

                  <td className="px-4 py-4">

                    <span
                      className={
                        product.stock <= 5
                          ? "font-semibold text-red-600"
                          : "font-medium"
                      }
                    >
                      {product.stock}
                    </span>

                  </td>

                  {/* Sold */}

                  <td className="px-4 py-4">

                    {product.sold}

                  </td>

                  {/* Status */}

                  <td className="px-4 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.active
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-4">

                    <div className="flex justify-end gap-2">

                      <Link
                        href={`/admin/products/edit/${product._id}`}
                        className="rounded-lg p-2 transition hover:bg-blue-100"
                      >
                        <Pencil
                          size={18}
                          className="text-blue-600"
                        />
                      </Link>

                      <button
                        onClick={() =>
                          onDelete(product._id)
                        }
                        className="rounded-lg p-2 transition hover:bg-red-100"
                      >
                        <Trash2
                          size={18}
                          className="text-red-600"
                        />
                      </button>

                    </div>

                  </td>

                </tr>

              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}