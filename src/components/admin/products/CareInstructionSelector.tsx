"use client";

import { KeyboardEvent, useMemo } from "react";
import { Plus, X } from "lucide-react";

const DEFAULT_CARE = [
  "Store in a cool, dry place.",
  "Avoid water.",
  "Avoid perfumes and harsh chemicals.",
  "Keep away from direct sunlight.",
  "Clean with a soft dry cloth.",
  "Handle with care.",
  "Remove before bathing.",
  "Remove before swimming.",
  "Remove before sleeping.",
  "Keep away from fire.",
  "Avoid excessive bending.",
  "Store in a jewelry box.",
  "Keep away from sharp objects.",
  "Do not expose to extreme heat.",
  "Do not wash.",
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CareInstructionSelector({
  value,
  onChange,
}: Props) {
  const selected = value
    ? value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const suggestions = useMemo(() => {
    return DEFAULT_CARE.filter(
      (item) => !selected.includes(item)
    );
  }, [selected]);

  function update(items: string[]) {
    onChange(items.join("\n"));
  }

  function addInstruction(text: string) {
    const instruction = text.trim();

    if (!instruction) return;

    if (selected.includes(instruction)) return;

    update([...selected, instruction]);
  }

  function removeInstruction(text: string) {
    update(
      selected.filter(
        (item) => item !== text
      )
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

    addInstruction(text);

    input.value = "";
  }

  return (
    <div className="space-y-4">

      <div>
        <label className="mb-2 block text-sm font-medium">
          Care Instructions
        </label>

        <div className="flex flex-wrap gap-2">

          {selected.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-sm text-white"
            >
              {item}

              <button
                type="button"
                onClick={() =>
                  removeInstruction(item)
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

          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                addInstruction(item)
              }
              className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:border-black hover:bg-black hover:text-white"
            >
              <Plus size={14} />

              {item}
            </button>
          ))}

        </div>

      </div>

      <input
        type="text"
        placeholder="Add custom care instruction..."
        onKeyDown={handleKeyDown}
        className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
      />

    </div>
  );
}