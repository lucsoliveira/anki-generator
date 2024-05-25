import { Controller, Get, Post, Req } from '@nestjs/common';

@Controller('anki')
export class AnkiController {
  @Post('/phrases/generate')
  generatePhrases(@Req() request: Request): { data: string } {
    return {
      data: 'ola mundo',
    };
  }
}
