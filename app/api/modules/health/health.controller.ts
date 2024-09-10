import { AnkiConnectService } from "../anki-connect/anki-connect.service";

export class HealthController {
  constructor(private ankiConnectService: AnkiConnectService) {}

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
