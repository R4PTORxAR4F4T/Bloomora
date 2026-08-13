import axios from "@/src/lib/axios";

import { DashboardData } from "@/src/types/dashboard";

class DashboardService {
  async getDashboard(): Promise<DashboardData> {
    const response = await axios.get("/admin/dashboard");

    return response.data.data;
  }
}

export default new DashboardService();