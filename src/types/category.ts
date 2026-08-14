export interface CategoryIcon {
  url: string;

  publicId: string;
}

export interface Category {
  _id: string;

  name: string;

  slug: string;

  description: string;

  icon?: CategoryIcon;

  active: boolean;

  createdAt?: string;

  updatedAt?: string;
}
