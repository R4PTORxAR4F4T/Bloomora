import axios from "@/src/lib/axios";

class SubCategoryService {
  async getSubCategories(
    category?: string
  ) {
    const response = await axios.get(
      "/subcategories",
      {
        params: {
          category,
        },
      }
    );

    return response.data.data;
  }

  async getSubCategory(id: string) {
    const response = await axios.get(
      `/subcategories/${id}`
    );

    return response.data.data;
  }

  async createSubCategory(data: {
    name: string;
    category: string;
    skuPrefix: string;
    active: boolean;
  }) {
    const response = await axios.post(
      "/subcategories",
      data
    );

    return response.data.data;
  }

  async updateSubCategory(
    id: string,
    data: {
      name: string;
      category: string;
      skuPrefix: string;
      active: boolean;
    }
  ) {
    const response = await axios.patch(
      `/subcategories/${id}`,
      data
    );

    return response.data.data;
  }

  async updateStatus(
    id: string,
    active: boolean
  ) {
    const response = await axios.patch(
      `/subcategories/${id}/status`,
      {
        active,
      }
    );

    return response.data.data;
  }

  async deleteSubCategory(id: string) {
    const response = await axios.delete(
      `/subcategories/${id}`
    );

    return response.data;
  }
}

export default new SubCategoryService();