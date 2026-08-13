"use client";

import { KeyboardEvent, useMemo } from "react";
import { Plus, X } from "lucide-react";

const DEFAULT_MATERIALS = [
  "Polymer Clay",
  "Resin",
  "Porcelain",
  "Ceramic",
  "Air Dry Clay",
  "Stainless Steel",
  "Sterling Silver",
  "Gold Plated",
  "Brass",
  "Copper",
  "Glass",
  "Wood",
  "Leather",
  "Cotton",
  "Fabric",
  "Acrylic",
  "Beads",
  "Pearl",
  "Crystal",
  "Clay",
];

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function MaterialSelector({
  value,
  onChange,
}: Props) {
  const suggestions = useMemo(() => {
    return DEFAULT_MATERIALS.filter(
      (item) => !value.includes(item)
    );
  }, [value]);

  function addMaterial(material: string) {
    if (!material.trim()) return;

    if (value.includes(material)) return;

    onChange([...value, material]);
  }

  function removeMaterial(material: string) {
    onChange(
      value.filter((item) => item !== material)
    );
  }

  function handleKeyDown(
    e: KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const input = e.currentTarget;

    const text = input.value.trim();

    if (!text) return;

    addMaterial(text);

    input.value = "";
  }

  return (
    <div className="space-y-4">

      <div>
        <label className="mb-2 block text-sm font-medium">
          Materials
        </label>

        <div className="flex flex-wrap gap-2">

          {value.map((material) => (
            <div
              key={material}
              className="flex items-center gap-2 rounded-full bg-black px-3 py-1 text-sm text-white"
            >
              {material}

              <button
                type="button"
                onClick={() =>
                  removeMaterial(material)
                }
              >
                <X size={14} />
              </button>
            </div>
          ))}

        </div>
      </div>

      <div>
        <p className="mb-2 text-sm text-gray-500">
          Suggestions
        </p>

        <div className="flex flex-wrap gap-2">

          {suggestions.map((material) => (
            <button
              key={material}
              type="button"
              onClick={() =>
                addMaterial(material)
              }
              className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition hover:border-black hover:bg-black hover:text-white"
            >
              <Plus size={14} />

              {material}
            </button>
          ))}

        </div>
      </div>

      <input
        type="text"
        placeholder="Add custom material and press Enter..."
        onKeyDown={handleKeyDown}
        className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
      />

    </div>
  );
}