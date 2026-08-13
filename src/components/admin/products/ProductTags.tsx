"use client";

import { ProductFormData } from "./ProductForm";

import MaterialSelector from "./MaterialSelector";
import ColorSelector from "./ColorSelector";
import TagSelector from "./TagSelector";
import CareInstructionSelector from "./CareInstructionSelector";
import DimensionInputs from "./DimensionInputs";

interface Props {
  form: ProductFormData;

  updateField: <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) => void;
}

export default function ProductTags({
  form,
  updateField,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-8 text-2xl font-semibold">
        Product Attributes
      </h2>

      <div className="space-y-10">

        <MaterialSelector
          value={form.materials}
          onChange={(materials) =>
            updateField(
              "materials",
              materials
            )
          }
        />

        <ColorSelector
          value={form.colors}
          onChange={(colors) =>
            updateField(
              "colors",
              colors
            )
          }
        />

        <TagSelector
          value={form.tags}
          onChange={(tags) =>
            updateField(
              "tags",
              tags
            )
          }
        />

        <DimensionInputs
          value={form.dimensions}
          onChange={(dimensions) =>
            updateField(
              "dimensions",
              dimensions
            )
          }
        />

        <CareInstructionSelector
          value={form.careInstructions}
          onChange={(careInstructions) =>
            updateField(
              "careInstructions",
              careInstructions
            )
          }
        />

      </div>

    </section>
  );
}