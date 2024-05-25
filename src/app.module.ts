import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnkiModule } from './anki/anki.module';
import { ChatgptModule } from './chatgpt/chatgpt.module';

@Module({
  imports: [AnkiModule, ChatgptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
