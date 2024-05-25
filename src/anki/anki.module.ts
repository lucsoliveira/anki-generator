import { Module } from '@nestjs/common';
import { AnkiController } from './anki.controller';
import { AnkiService } from './anki.service';

@Module({
  controllers: [AnkiController],
  providers: [AnkiService],
})
export class AnkiModule {
  constructor(private ankiService: AnkiService) {}
}
