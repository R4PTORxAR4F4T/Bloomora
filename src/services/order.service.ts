import axios from "@/src/lib/axios";
import {
  Order,
  OrderStatus,
  PaymentStatus,
} from "@/src/types/order";

class OrderService {
  async getAllOrders(): Promise<Order[]> {
    const { data } = await axios.get("/admin/orders");
    return data.data;
  }

  async getOrder(id: string): Promise<Order> {
    const { data } = await axios.get(
      `/admin/orders/${id}`
    );

    return data.data;
  }

  async updateOrderStatus(
    id: string,
    orderStatus: OrderStatus
  ) {
    const { data } = await axios.patch(
      `/admin/orders/${id}/status`,
      {
        orderStatus,
      }
    );

    return data.data;
  }

  async updatePaymentStatus(
    id: string,
    paymentStatus: PaymentStatus,
    transactionId?: string
  ) {
    const { data } = await axios.patch(
      `/admin/orders/${id}/payment-status`,
      {
        paymentStatus,
        transactionId,
      }
    );

    return data.data;
  }

  async updateTracking(
    id: string,
    trackingNumber: string
  ) {
    const { data } = await axios.patch(
      `/admin/orders/${id}/tracking`,
      {
        trackingNumber,
      }
    );

    return data.data;
  }
}

export default new OrderService();