import { Controller, Get } from '@nestjs/common';
import { AnkiConnectService } from 'src/anki-connect/anki-connect.service';
@Controller('health')
export class HealthController {
  constructor(private ankiConnectService: AnkiConnectService) {}

  @Get('/')
  async getHealth(): Promise<any> {
    const ankiConnectStatus = await this.ankiConnectService.checkHealth();
    return {
      data: {
        api: {
          status: 'UP',
          uptime: process.uptime(),
        },
        ankiConnect: ankiConnectStatus,
      },
    };
  }
}
