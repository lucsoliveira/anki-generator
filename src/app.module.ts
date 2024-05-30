import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnkiModule } from './anki/anki.module';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { HealthModule } from './health/health.module';
import { AnkiConnectService } from './anki-connect/anki-connect.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AnkiModule,
    ChatgptModule,
    FilesModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AnkiConnectService],
})
export class AppModule {}
