import { Module } from '@nestjs/common';
import { AnkiController } from './anki.controller';
import { AnkiService } from './anki.service';
import { ChatgptModule } from 'src/chatgpt/chatgpt.module';
import { ChatgptService } from 'src/chatgpt/chatgpt.service';

@Module({
  imports: [ChatgptModule],
  controllers: [AnkiController],
  providers: [AnkiService, ChatgptService],
})
export class AnkiModule {
  constructor() {}
}
