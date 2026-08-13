import axios from "@/src/lib/axios";
import { StoreSettings } from "@/src/types/settings";

class SettingsService {
  async getSettings(): Promise<StoreSettings> {
    const { data } = await axios.get(
      "/admin/settings"
    );

    return data.data;
  }

  async updateSettings(
    payload: StoreSettings
  ): Promise<StoreSettings> {
    const { data } = await axios.patch(
      "/admin/settings",
      payload
    );

    return data.data;
  }
}

export default new SettingsService();