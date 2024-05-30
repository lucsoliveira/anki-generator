import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { AnkiConnectService } from 'src/anki-connect/anki-connect.service';

@Module({
  controllers: [HealthController],
  providers: [HealthService, AnkiConnectService],
})
export class HealthModule {}
