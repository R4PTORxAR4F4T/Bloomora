import axios from "@/src/lib/axios";
import {
  CheckoutData,
  Order,
  PaymentMethod,
} from "@/src/types/order";

class CustomerOrderService {
  async getMyOrders(): Promise<Order[]> {
    const { data } = await axios.get("/orders");
    return data.data;
  }

  async getOrder(id: string): Promise<Order> {
    const { data } = await axios.get(`/orders/${id}`);
    return data.data;
  }

  async getCheckout(): Promise<CheckoutData> {
    const { data } = await axios.get("/orders/checkout");
    return data.data;
  }

  async placeOrder(
    addressId: string,
    paymentMethod: PaymentMethod,
    couponCode?: string
  ): Promise<Order> {
    const { data } = await axios.post("/orders/place-order", {
      addressId,
      paymentMethod,
      couponCode,
    });

    return data.data;
  }
}

export default new CustomerOrderService();