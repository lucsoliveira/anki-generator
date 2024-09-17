import { API_PATHS } from "../constants/paths";
import { useAPI } from "../hooks";

export function HealthServices() {
  const { get } = useAPI();
  async function getHealth() {
    try {
      const result = await get(API_PATHS.HEALTH);
      const data: {
        data: {
          api: {
            status: string;
            uptime: number;
          };
          ankiConnect: {
            status: string;
          };
        };
      } = result.data;

      const statusAnkiConnect = data.data.ankiConnect.status === "UP";
      const statusApi = data.data.api.status === "UP";

      return {
        success: true,
        api: statusApi,
        ankiConnect: statusAnkiConnect,
      };
    } catch (error) {
      return {
        success: false,
        api: false,
        ankiConnect: false,
      };
    }
  }

  return {
    getHealth,
  };
}
