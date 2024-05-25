import { Body, Controller, Post } from '@nestjs/common';
import { AnkiService } from './anki.service';
import { ResultPhrasesDTO } from './interfaces';

@Controller('anki')
export class AnkiController {
  constructor(private ankiService: AnkiService) {}
  @Post('/phrases/generate')
  async generatePhrases(
    @Body()
    generatePhraseDto: {
      data: {
        words: string[];
      };
    },
  ): Promise<{ data: ResultPhrasesDTO | null; error?: string }> {
    const { words } = generatePhraseDto.data;

    try {
      const result = await this.ankiService.generatePhrases(words);
      return {
        data: result,
      };
    } catch (error) {
      return {
        data: null,
        error: error.message,
      };
    }
  }
}
