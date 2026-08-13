"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import { Trash2, Upload } from "lucide-react";

import uploadService from "@/src/services/upload.service";

import { ProductImage } from "@/src/types/product";
import { ProductFormData } from "./ProductForm";
import { toast } from "sonner";

interface Props {
  form: ProductFormData;

  updateField: <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) => void;
}

export default function ProductImages({
  form,
  updateField,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    try {
      setUploading(true);

      const uploadedImages =
        await uploadService.uploadImages(
          Array.from(files)
        );

      updateField("images", [
        ...form.images,
        ...uploadedImages,
      ]);
    } catch (error) {
      console.error(error);

      toast.error("Failed to upload images.");
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  async function removeImage(
    index: number
  ) {
    try {
      const image = form.images[index];

      if (image.publicId) {
        await uploadService.deleteImage(
          image.publicId
        );
      }

      updateField(
        "images",
        form.images.filter(
          (_, i) => i !== index
        )
      );
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete image.");
    }
  }

  function updateAltText(
    index: number,
    alt: string
  ) {
    const updatedImages: ProductImage[] = [
      ...form.images,
    ];

    updatedImages[index] = {
      ...updatedImages[index],
      alt,
    };

    updateField(
      "images",
      updatedImages
    );
  }

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Product Images
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Upload one or more product images.
          </p>
        </div>

        <button
          type="button"
          disabled={uploading}
          onClick={() =>
            inputRef.current?.click()
          }
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Upload size={18} />

          {uploading
            ? "Uploading..."
            : "Upload Images"}
        </button>
      </div>

      <input
        ref={inputRef}
        hidden
        multiple
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      {form.images.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed py-12 text-center text-gray-500">
          No images uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
          {form.images.map(
            (image, index) => (
              <div
                key={
                  image.publicId || index
                }
                className="group relative overflow-hidden rounded-lg border bg-white"
              >
                <Image
                  src={image.url}
                  alt={
                    image.alt ||
                    "Product"
                  }
                  width={250}
                  height={250}
                  loading="eager"
                  priority={index===0}
                  className="aspect-square h-full w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeImage(index)
                  }
                  className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-700"
                >
                  <Trash2 size={16} />
                </button>

                <div className="border-t p-2">
                  <input
                    type="text"
                    value={
                      image.alt ?? ""
                    }
                    placeholder="Alt text"
                    onChange={(e) =>
                      updateAltText(
                        index,
                        e.target.value
                      )
                    }
                    className="w-full rounded border px-2 py-1 text-sm focus:border-black focus:outline-none"
                  />
                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}