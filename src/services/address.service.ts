import axios from "@/src/lib/axios";
import { Address } from "@/src/types/user";

class AddressService {
  async getAddresses(): Promise<Address[]> {
    const { data } = await axios.get("/address");
    return data.data;
  }

  async addAddress(
    address: Omit<Address, "isDefault">
  ): Promise<Address> {
    const { data } = await axios.post(
      "/address",
      address
    );

    return data.data;
  }

  async updateAddress(
    id: string,
    address: Omit<Address, "isDefault">
  ): Promise<Address> {
    const { data } = await axios.patch(
      `/address/${id}`,
      address
    );

    return data.data;
  }

  async deleteAddress(id: string) {
    await axios.delete(`/address/${id}`);
  }

  async setDefaultAddress(id: string) {
    const { data } = await axios.patch(
      `/address/${id}/default`
    );

    return data.data;
  }
}

export default new AddressService();