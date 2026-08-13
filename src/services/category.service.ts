import axios from "@/src/lib/axios";

class CategoryService {
  async getCategories() {
    const response = await axios.get(
      "/categories"
    );

    return response.data.data;
  }

  async getCategory(id: string) {
    const response = await axios.get(
      `/categories/${id}`
    );

    return response.data.data;
  }

  async createCategory(data: {
    name: string;
    description: string;
    active: boolean;
  }) {
    const response = await axios.post(
      "/admin/categories",
      data
    );

    return response.data.data;
  }

  async updateCategory(
    id: string,
    data: {
      name: string;
      description: string;
      active: boolean;
    }
  ) {
    const response = await axios.patch(
      `/admin/categories/${id}`,
      data
    );

    return response.data.data;
  }

  async updateStatus(
    id: string,
    active: boolean
  ) {
    const response = await axios.patch(
      `/admin/categories/${id}/status`,
      {
        active,
      }
    );

    return response.data.data;
  }

  async deleteCategory(id: string) {
    const response = await axios.delete(
      `/admin/categories/${id}`
    );

    return response.data.data;
  }
}

export default new CategoryService();