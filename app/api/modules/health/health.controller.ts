import { AnkiConnectServiceV1 } from "../anki-connect";

export class HealthController {
  constructor(private ankiConnectService: AnkiConnectServiceV1) {}

  async getHealth(): Promise<any> {
    const ankiConnectStatus = await this.ankiConnectService.checkHealth();
    return {
      data: {
        api: {
          status: "UP",
          uptime: process.uptime(),
        },
        ankiConnect: ankiConnectStatus,
      },
    };
  }
}
