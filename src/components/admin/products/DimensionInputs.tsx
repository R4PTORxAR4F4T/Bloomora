"use client";

import { ProductDimensions } from "@/src/types/product";

interface Props {
  value: ProductDimensions;

  onChange: (
    value: ProductDimensions
  ) => void;
}

export default function DimensionInputs({
  value,
  onChange,
}: Props) {
  function update<
    K extends keyof ProductDimensions
  >(
    key: K,
    val: ProductDimensions[K]
  ) {
    onChange({
      ...value,
      [key]: val,
    });
  }

  return (
    <div>

      <h3 className="mb-4 text-lg font-semibold">
        Product Dimensions
      </h3>

      <div className="grid gap-6 md:grid-cols-3">

        {/* Width */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Width
          </label>

          <input
            type="number"
            min={0}
            value={
              value.width || ""
            }
            onChange={(e) =>
              update(
                "width",
                Number(
                  e.target.value
                ) || 0
              )
            }
            placeholder="Width"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          />
        </div>

        {/* Height */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Height
          </label>

          <input
            type="number"
            min={0}
            value={
              value.height || ""
            }
            onChange={(e) =>
              update(
                "height",
                Number(
                  e.target.value
                ) || 0
              )
            }
            placeholder="Height"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          />
        </div>

        {/* Unit */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Unit
          </label>

          <select
            value={value.unit}
            onChange={(e) =>
              update(
                "unit",
                e.target
                  .value as "mm" | "cm"
              )
            }
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          >
            <option value="mm">
              Millimeter (mm)
            </option>

            <option value="cm">
              Centimeter (cm)
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}