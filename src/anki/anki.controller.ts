import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AnkiService } from './anki.service';
import { ResultPhrasesDTO } from './interfaces';

@Controller('anki')
export class AnkiController {
  private readonly logger = new Logger(AnkiController.name);
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

    this.logger.log(`starting generate phrases`);
    this.logger.debug(`input: ${words.join(',')}`);

    try {
      const result = await this.ankiService.generatePhrases(words);
      return {
        data: result,
      };
    } catch (error) {
      this.logger.error(`${error.message}`);
      return {
        data: null,
        error: error.message,
      };
    }
  }
}
