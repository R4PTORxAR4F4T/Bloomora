import axios from "@/src/lib/axios";

export interface PublicSettings {
  storeName: string;
  storeDescription: string;
  storeLogo: string;
  favicon: string;
  maintenanceMode: boolean;
}

class PublicSettingsService {
  async getSettings(): Promise<PublicSettings> {
    const { data } = await axios.get(
      "/settings/public"
    );

    return data.data;
  }
}

export default new PublicSettingsService();