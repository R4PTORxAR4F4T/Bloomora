"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import { Trash2, Upload } from "lucide-react";

import uploadService from "@/src/services/upload.service";

import { CategoryFormData } from "./CategoryForm";
import { toast } from "sonner";

interface Props {
  form: CategoryFormData;

  updateField: <K extends keyof CategoryFormData>(
    key: K,
    value: CategoryFormData[K]
  ) => void;
}

export default function CategoryIcon({
  form,
  updateField,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    try {
      setUploading(true);

      // Replacing an existing icon: clean up the old one so it
      // doesn't linger in Cloudinary.
      if (form.icon?.publicId) {
        await uploadService.deleteImage(form.icon.publicId);
      }

      const [uploadedIcon] = await uploadService.uploadImages([
        files[0],
      ]);

      updateField("icon", uploadedIcon);
    } catch (error) {
      console.error(error);

      toast.error("Failed to upload icon.");
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  async function removeIcon() {
    try {
      if (form.icon?.publicId) {
        await uploadService.deleteImage(form.icon.publicId);
      }

      updateField("icon", undefined);
    } catch (error) {
      console.error(error);

      toast.error("Failed to remove icon.");
    }
  }

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Category Icon
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Shown on the storefront wherever this category is
            listed. Falls back to a default icon if left empty.
          </p>
        </div>

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Upload size={18} />

          {uploading
            ? "Uploading..."
            : form.icon
            ? "Replace Icon"
            : "Upload Icon"}
        </button>
      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      {!form.icon ? (
        <div className="rounded-lg border-2 border-dashed py-12 text-center text-gray-500">
          No icon uploaded yet — a default icon will be used.
        </div>
      ) : (
        <div className="group relative w-fit overflow-hidden rounded-lg border bg-white">
          <div className="flex h-32 w-32 items-center justify-center p-4">
            <Image
              src={form.icon.url}
              alt="Category icon"
              width={96}
              height={96}
              className="h-full w-full object-contain"
            />
          </div>

          <button
            type="button"
            onClick={removeIcon}
            className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-700"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
