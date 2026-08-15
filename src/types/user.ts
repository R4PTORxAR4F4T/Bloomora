export interface Address {
   _id?: string;
  label: string;
  receiverName: string;
  phone: string;
  division: string;
  district: string;
  area: string;
  address: string;
  postalCode: string;
  isDefault: boolean;
}

export interface User {
  _id: string;

  firebaseUid: string;

  name: string;

  email: string;

  photoURL: string;

  phone: string;

  addresses: Address[];

  role: "customer" | "admin";

  active: boolean;

  emailVerified: boolean;

  lastLogin: string;

  createdAt: string;

  updatedAt: string;
}

export interface CustomerStatistics {
  totalOrders: number;

  totalSpent: number;
}

export interface Customer extends User {
  statistics?: CustomerStatistics;
}

export interface CustomerDetails {
  user: User;

  statistics: CustomerStatistics;

  recentOrders?: {
    _id: string;

    orderNumber: string;

    total: number;

    orderStatus: string;

    payment: {
      method: string;

      status: string;

      transactionId?: string;

      paidAt?: string;
    };

    createdAt: string;
  }[];
}