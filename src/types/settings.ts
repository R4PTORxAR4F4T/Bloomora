export interface StoreSettings {
  _id?: string;

  // General
  storeName: string;
  storeDescription: string;
  storeLogo: string;
  favicon: string;

  // Contact
  email: string;
  phone: string;
  address: string;

  // Social
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;

  // Shipping
  shippingFee: number;
  freeShippingMinimum: number;

  // Payment
  enableCOD: boolean;
  enableSSLCommerz: boolean;
  enableBkash: boolean;
  enableNagad: boolean;

  // SEO
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;

  // Store
  currency: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
}