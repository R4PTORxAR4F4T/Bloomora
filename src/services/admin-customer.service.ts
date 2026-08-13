import axios from "@/src/lib/axios";
import {
  Customer,
  CustomerDetails,
} from "@/src/types/user";

class AdminCustomerService {
  async getCustomers(params?: {
    search?: string;
    role?: "customer" | "admin";
    active?: boolean;
  }): Promise<Customer[]> {
    const { data } = await axios.get(
      "/admin/users",
      {
        params,
      }
    );

    return data.data;
  }

  async getCustomer(
    id: string
  ): Promise<CustomerDetails> {
    const { data } = await axios.get(
      `/admin/users/${id}`
    );

    return data.data;
  }

  async updateStatus(
    id: string,
    active: boolean
  ) {
    const { data } = await axios.patch(
      `/admin/users/${id}/status`,
      {
        active,
      }
    );

    return data.data;
  }

  async updateRole(
    id: string,
    role: "customer" | "admin"
  ) {
    const { data } = await axios.patch(
      `/admin/users/${id}/role`,
      {
        role,
      }
    );

    return data.data;
  }

  async deleteCustomer(id: string) {
    const { data } = await axios.delete(
      `/admin/users/${id}`
    );

    return data;
  }
}

export default new AdminCustomerService();