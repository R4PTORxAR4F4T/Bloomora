export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned"
  | "refunded";

export type PaymentMethod =
  | "cod"
  | "sslcommerz"
  | "bkash"
  | "nagad";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export interface OrderCoupon {
  couponId?: string;

  code: string;

  discountType: "percentage" | "fixed";

  discountValue: number;

  discountAmount: number;
}

export interface CheckoutItem {
  product: string;

  name: string;

  image: string;

  quantity: number;

  color?: string;

  unitPrice: number;

  subtotal: number;
}

export interface CheckoutData {
  items: CheckoutItem[];

  addresses: any[];

  subtotal: number;

  shippingFee: number;

  discount: number;

  total: number;

  paymentMethods: PaymentMethod[];

  appliedCoupon?: OrderCoupon;
}

export interface OrderItem {
  product: string;

  productName: string;

  productSlug: string;

  productSku: string;

  productImage: string;

  material?: string;

  color?: string;

  size?: string;

  quantity: number;

  unitPrice: number;

  subtotal: number;
}

export interface ShippingAddress {
  receiverName: string;

  phone: string;

  division: string;

  district: string;

  area: string;

  address: string;

  postalCode: string;
}

export interface OrderTimeline {
  status: OrderStatus;

  note: string;

  updatedAt: string;
}

export interface OrderPayment {
  method: PaymentMethod;

  status: PaymentStatus;

  transactionId?: string;

  paidAt?: string;
}

export interface Order {
  _id: string;

  orderNumber: string;

  user: | string | {
    _id: string;
    name: string;
    email: string;
  };

  items: OrderItem[];

  shippingAddress: ShippingAddress;

  subtotal: number;

  shippingFee: number;

  discount: number;

  total: number;

  payment: OrderPayment;

  timeline: OrderTimeline[];

  adminNote?: string;

  cancelReason?: string;

  orderStatus: OrderStatus;

  coupon?: OrderCoupon;

  trackingNumber?: string;

  createdAt: string;

  updatedAt: string;
}

// The admin order endpoints (list + detail) always populate `user`
// server-side (see backend order.service.ts), so admin screens can
// rely on the object shape without a string fallback. Customer-facing
// order endpoints don't make that guarantee, which is why the base
// `Order` type above keeps `user` as a union.
export interface AdminOrder extends Omit<Order, "user"> {
  user: {
    _id: string;

    name: string;

    email: string;

    phone?: string;
  };
}