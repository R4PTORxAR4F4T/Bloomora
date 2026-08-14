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

export interface ProductCategoryRef {
  _id: string;

  name: string;

  slug?: string;
}

export interface Product {
  _id: string;

  name: string;

  slug: string;

  description: string;

  category?: ProductCategoryRef | string;

  subCategory?: ProductCategoryRef | string;

  brand?: string;

  price: number;

  discountPrice?: number;

  stock: number;

  sku?: string;

  images: ProductImage[];

  materials?: string[];

  colors?: string[];

  dimensions?: ProductDimensions;

  tags?: string[];

  careInstructions?: string;

  featured?: boolean;

  bestSeller?: boolean;

  newArrival?: boolean;

  active?: boolean;

  sold?: number;

  rating: number;

  totalReviews?: number;

  createdAt?: string;

  updatedAt?: string;
}