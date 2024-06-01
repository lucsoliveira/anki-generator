import { Module } from '@nestjs/common';
import { AnkiConnectService } from '../anki-connect/anki-connect.service';
import { AnkiModule } from '../anki/anki.module';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { ChatgptModule } from '../chatgpt/chatgpt.module';
import { FilesModule } from '../files/files.module';
import { HealthModule } from '../health/health.module';

@Module({
  imports: [AnkiModule, ChatgptModule, FilesModule, HealthModule, ApiModule],
  controllers: [AppController],
  providers: [AppService, AnkiConnectService],
})
export class ApiModule {}
