export interface DashboardOverview {
  totalUsers: number;

  totalProducts: number;

  totalOrders: number;

  totalRevenue: number;

  pendingOrders: number;

  processingOrders: number;

  packedOrders: number;

  shippedOrders: number;

  deliveredOrders: number;

  cancelledOrders: number;

  returnedOrders: number;

  paidOrders: number;

  pendingPayments: number;
}

export interface RevenuePoint {
  date: string;
  revenue: number;
}

export interface MonthlyRevenuePoint {
  month: number;
  revenue: number;
}

export interface OrderPoint {
  date: string;
  orders: number;
}

export interface MonthlyOrderPoint {
  month: number;
  orders: number;
}

export interface CustomerSummary {
  id: string;

  name: string;

  email: string;

  totalOrders: number;

  totalSpent: number;
}

export interface ProductSummary {
  _id: string;

  name: string;

  slug: string;

  stock: number;

  sold: number;

  rating: number;

  totalReviews: number;

  price: number;

  discountPrice: number;

  featured: boolean;

  bestSeller: boolean;

  newArrival: boolean;

  active: boolean;

  sku: string;

  images: {
    url: string;
    alt: string;
  }[];

  category?: {
    _id: string;
    name: string;
  };

  subCategory?: {
    _id: string;
    name: string;
  };
}

export interface CategoryPerformance {
  id: string;

  name: string;

  totalProducts: number;

  totalSold: number;
}

export interface RecentOrder {
  _id: string;

  orderNumber: string;

  total: number;

  orderStatus: string;

  paymentStatus: string;

  createdAt: string;

  user: {
    name: string;
    email: string;
  };
}

export interface DashboardData {
  overview: DashboardOverview;

  sales: {
    todayRevenue: number;

    yesterdayRevenue: number;

    thisWeekRevenue: number;

    thisMonthRevenue: number;

    thisYearRevenue: number;

    last30Days: RevenuePoint[];

    monthlyRevenue: MonthlyRevenuePoint[];
  };

  

  orders: {
    todayOrders: number;

    yesterdayOrders: number;

    thisWeekOrders: number;

    thisMonthOrders: number;

    last30Days: OrderPoint[];

    monthlyOrders: MonthlyOrderPoint[];
  };

  customers: {
    totalCustomers: number;

    newCustomersThisMonth: number;

    activeCustomers: number;

    repeatCustomers: number;

    topCustomers: CustomerSummary[];
  };

  products: {
    outOfStock: number;

    topSelling: ProductSummary[];

    lowStock: ProductSummary[];

    topRated: ProductSummary[];

    newArrivals: ProductSummary[];

    categoryPerformance: CategoryPerformance[];
  };

  recentOrders: RecentOrder[];
}