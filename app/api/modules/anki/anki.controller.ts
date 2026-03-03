import { AnkiConnect } from "../anki-connect/ankiconnect";
import { AnkiService } from "./anki.service";
import { ItemPhraseDTO, ResultPhrasesDTO, Language } from "./dto";
import { ResultGetDecksDTO } from "./dto/decks";

export class AnkiController {
  private readonly logger = console;
  constructor(
    readonly ankiService: AnkiService,
    readonly ankiConnectService: AnkiConnect
  ) {}
  async generatePhrases(generatePhraseDto: {
    data: {
      words: string[];
      language?: Language;
    };
  }): Promise<{ data: ResultPhrasesDTO | null; error?: string }> {
    const { words, language } = generatePhraseDto.data;

    this.logger.log(`starting generate phrases`);
    this.logger.debug(`input: ${words.join(",")}; lang=${language}`);

    try {
      const result = await this.ankiService.generatePhrases(words, language);
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

  async generateCards(generatePhraseDto: {
    data: {
      texts: ItemPhraseDTO[];
      language?: Language;
    };
  }): Promise<any> {
    const { texts, language } = generatePhraseDto.data;

    this.logger.log(
      `starting generate texts audios. texts ${texts.length}; lang=${language}`
    );

    try {
      const audios = await this.ankiService.generateAudios(
        texts,
        {
          defaultVoice: "alloy",
          randomVoice: true,
        },
        language
      );

      const audiosNormalized = audios.map((item) => {
        return {
          ...item,
          audioPath: item.audioPath,
          audioName: item.audioPath.split("/uploads/")[1],
        };
      });
      return {
        data: { audios: audiosNormalized },
      };
    } catch (error) {
      this.logger.error(`${error.message}`);
      return {
        data: null,
        error: error.message,
      };
    }
  }

  async generateCardsAndSync(generatePhraseDto: {
    data: {
      deckName: string;
      texts: ItemPhraseDTO[];
    };
  }): Promise<any> {
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

  async getDecks(): Promise<ResultGetDecksDTO> {
    this.logger.log(`getting decks`);

    try {
      const result = await this.ankiConnectService.getDeckes();
      const decks = result;
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
