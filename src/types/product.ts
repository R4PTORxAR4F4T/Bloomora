export interface ProductImage {
  url: string;

  publicId: string;

  alt: string;
}

export interface ProductDimensions {
  width: number;

  height: number;

  unit: "mm" | "cm";
}