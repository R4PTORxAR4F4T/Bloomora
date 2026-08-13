"use client";

import { KeyboardEvent, useMemo } from "react";
import { Plus, X } from "lucide-react";

const DEFAULT_TAGS = [
  "Handmade",
  "Premium",
  "New",
  "Trending",
  "Best Seller",
  "Limited Edition",
  "Gift",
  "Birthday",
  "Wedding",
  "Anniversary",
  "Valentine",
  "Minimal",
  "Luxury",
  "Vintage",
  "Boho",
  "Cute",
  "Elegant",
  "Floral",
  "Rose",
  "Butterfly",
  "Pearl",
  "Resin",
  "Polymer Clay",
  "Jewelry",
  "Necklace",
  "Bracelet",
  "Ring",
  "Earrings",
];

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function TagSelector({
  value,
  onChange,
}: Props) {
  const suggestions = useMemo(() => {
    return DEFAULT_TAGS.filter(
      (tag) => !value.includes(tag)
    );
  }, [value]);

  function addTag(tag: string) {
    const text = tag.trim();

    if (!text) return;

    if (value.includes(text)) return;

    onChange([...value, text]);
  }

  function removeTag(tag: string) {
    onChange(
      value.filter((item) => item !== tag)
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

    addTag(text);

    input.value = "";
  }

  return (
    <div className="space-y-4">

      <div>
        <label className="mb-2 block text-sm font-medium">
          Tags
        </label>

        <div className="flex flex-wrap gap-2">

          {value.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-2 rounded-full bg-black px-3 py-1 text-sm text-white"
            >
              {tag}

              <button
                type="button"
                onClick={() =>
                  removeTag(tag)
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

          {suggestions.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() =>
                addTag(tag)
              }
              className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition hover:border-black hover:bg-black hover:text-white"
            >
              <Plus size={14} />

              {tag}
            </button>
          ))}

        </div>
      </div>

      <input
        type="text"
        placeholder="Add custom tag and press Enter..."
        onKeyDown={handleKeyDown}
        className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
      />

    </div>
  );
}