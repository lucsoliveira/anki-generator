import { Module } from '@nestjs/common';
import { AnkiController } from './anki.controller';
import { AnkiService } from './anki.service';
import { ChatgptModule } from 'src/chatgpt/chatgpt.module';
import { ChatgptService } from 'src/chatgpt/chatgpt.service';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';
import { AnkiConnectService } from '../anki-connect/anki-connect.service';

@Module({
  imports: [ChatgptModule, FilesModule],
  controllers: [AnkiController],
  providers: [AnkiService, ChatgptService, FilesService, AnkiConnectService],
})
export class AnkiModule {
  constructor() {}
}
