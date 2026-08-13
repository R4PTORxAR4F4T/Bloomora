import axios from "@/src/lib/axios";

class AdminProductService {
  async getProducts(params?: any) {
    const response = await axios.get(
      "/admin/products",
      {
        params,
      }
    );

    return response.data.data;
  }

  async getProduct(id: string) {
    const response = await axios.get(
      `/admin/products/${id}`
    );

    return response.data.data;
  }

  async createProduct(data: any) {
    const response = await axios.post(
      "/admin/products",
      data
    );

    return response.data.data;
  }

  async updateProduct(
    id: string,
    data: any
  ) {
    const response = await axios.patch(
      `/admin/products/${id}`,
      data
    );

    return response.data.data;
  }

  async deleteProduct(id: string) {
    const response = await axios.delete(
      `/admin/products/${id}`
    );

    return response.data;
  }

  async updateStatus(
    id: string,
    active: boolean
  ) {
    const response = await axios.patch(
      `/admin/products/${id}/status`,
      {
        active,
      }
    );

    return response.data.data;
  }

  async updateStock(
    id: string,
    stock: number
  ) {
    const response = await axios.patch(
      `/admin/products/${id}/stock`,
      {
        stock,
      }
    );

    return response.data.data;
  }
}

export default new AdminProductService();