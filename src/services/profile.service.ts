import axios from "@/src/lib/axios";
import { User } from "@/src/types/user";

class ProfileService {
  async getProfile(): Promise<User> {
    const { data } = await axios.get("/profile");
    return data.data;
  }

  async updateProfile(payload: {
    name: string;
    phone: string;
  }): Promise<User> {
    const { data } = await axios.patch(
      "/profile",
      payload
    );

    return data.data;
  }
}

export default new ProfileService();