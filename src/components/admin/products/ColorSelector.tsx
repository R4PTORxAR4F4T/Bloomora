"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { Sketch } from "@uiw/react-color";

interface Props {
  value: string[];

  onChange: (value: string[]) => void;
}

export default function ColorSelector({
  value,
  onChange,
}: Props) {
  const pickerRef =
    useRef<HTMLDivElement>(null);

  const [showPicker, setShowPicker] =
    useState(false);

  const [selectedColor, setSelectedColor] =
    useState("#000000");

  function removeColor(color: string) {
    onChange(
      value.filter(
        (item) => item !== color
      )
    );
  }

  function addColor() {
    if (value.includes(selectedColor))
      return;

    onChange([
      ...value,
      selectedColor,
    ]);

    setShowPicker(false);
  }

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(
          event.target as Node
        )
      ) {
        setShowPicker(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="space-y-5">

      <div>
        <label className="mb-3 block text-sm font-medium">
          Colors
        </label>

        <div className="flex flex-wrap gap-4">

          {/* selected color list */}
          {value.map((color) => (
            <div
              key={color}
              className="group relative w-24 overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
            >
              <div
                className="h-16 w-full"
                style={{
                  backgroundColor: color,
                }}
              />

              <div className="flex items-center justify-between border-t px-2 py-2">

                <span className="truncate text-xs font-medium">
                  {color.toUpperCase()}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    removeColor(color)
                  }
                  className="text-red-500 transition hover:text-red-700"
                >
                  <X size={14} />
                </button>

              </div>
            </div>
          ))}

          {/* Add Color Card */}

          <div className="w-24 rounded-xl border bg-gray-50 shadow-sm">

            <div
              className="h-16 w-full rounded-t-xl border-b"
              style={{
                backgroundColor:
                  selectedColor,
              }}
            />

            <div className="space-y-2 p-2">

              <button
                type="button"
                onClick={() =>
                  setShowPicker((prev) => !prev)
                }
                className="w-full rounded-md border py-1 text-xs transition hover:bg-black hover:text-white"
              >
                Pick
              </button>

              <button
                type="button"
                onClick={addColor}
                className="flex w-full items-center justify-center gap-1 rounded-md bg-black py-1 text-xs text-white transition hover:bg-gray-800"
              >
                <Plus size={12} />

                Add
              </button>

            </div>

          </div>

        </div>

      </div>

      {showPicker && (
        <div
          ref={pickerRef}
          className="absolute z-50 mt-3"
        >
          <Sketch
            color={selectedColor}
            onChange={(color) =>
              setSelectedColor(color.hex)
            }
          />
        </div>
      )}

    </div>
  );
}