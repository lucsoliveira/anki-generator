import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AnkiService } from './anki.service';
import { CardDataDTO, ItemPhraseDTO, ResultPhrasesDTO } from './dto';
import { AnkiConnectService } from '../anki-connect/anki-connect.service';
import { ResultGetDecksDTO } from './dto/decks';

@Controller('anki')
export class AnkiController {
  private readonly logger = new Logger(AnkiController.name);
  constructor(
    private ankiService: AnkiService,
    private ankiConnectService: AnkiConnectService,
  ) {}
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

  @Post('/phrases/generate/audio')
  async generateCards(
    @Body()
    generatePhraseDto: {
      data: {
        texts: ItemPhraseDTO[];
      };
    },
  ): Promise<any> {
    const { texts } = generatePhraseDto.data;

    this.logger.log(`starting generate texts audios. texts ${texts.length}`);

    try {
      const audios = await this.ankiService.generateAudios(texts, {
        defaultVoice: 'alloy',
        randomVoice: true,
      });
      return {
        data: { audios },
      };
    } catch (error) {
      this.logger.error(`${error.message}`);
      return {
        data: null,
        error: error.message,
      };
    }
  }

  @Post('/cards/generate')
  async generateCardsAndSync(
    @Body()
    generatePhraseDto: {
      data: {
        deckName: string;
        texts: ItemPhraseDTO[];
      };
    },
  ): Promise<any> {
    const { deckName, texts } = generatePhraseDto.data;

    this.logger.log(`starting generate texts audios. texts ${texts.length}`);

    try {
      const cardsData = await this.ankiService.generateCardsData(texts);

      for (const card of cardsData) {
        await this.ankiConnectService.addNote(deckName, card);
        this.logger.log(`card '${card.cardFront}' created`);
      }
      return {
        data: { cardsData },
      };
    } catch (error) {
      this.logger.error(`${error.message}`);
      return {
        data: null,
        error: error.message,
      };
    }
  }

  @Get('/decks')
  async getDecks(): Promise<ResultGetDecksDTO> {
    this.logger.log(`getting decks`);

    try {
      const result = await this.ankiConnectService.getDeckes();
      const decks = result.result;
      return {
        data: { decks },
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
