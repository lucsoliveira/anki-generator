import { AnkiConnect } from "../anki-connect/ankiconnect";
import { AnkiService } from "./anki.service";
import { ItemPhraseDTO, ResultPhrasesDTO, Language, CardDataDTO } from "./dto";
import { ResultGetDecksDTO } from "./dto/decks";

interface AudioResponseDTO {
  word: string;
  audioPath: string;
  audioName: string;
}

interface GenerateCardsResponseDTO {
  data: { audios: AudioResponseDTO[] } | null;
  error?: string;
}

interface GenerateCardsAndSyncResponseDTO {
  data: { cardsData: CardDataDTO[] } | null;
  error?: string;
}

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
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      this.logger.error(`${errorMessage}`);
      return {
        data: null,
        error: errorMessage,
      };
    }
  }

  async generateCards(generatePhraseDto: {
    data: {
      texts: ItemPhraseDTO[];
      language?: Language;
    };
  }): Promise<GenerateCardsResponseDTO> {
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
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      this.logger.error(`${errorMessage}`);
      return {
        data: null,
        error: errorMessage,
      };
    }
  }

  async generateCardsAndSync(generatePhraseDto: {
    data: {
      deckName: string;
      texts: ItemPhraseDTO[];
    };
  }): Promise<GenerateCardsAndSyncResponseDTO> {
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
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      this.logger.error(`${errorMessage}`);
      return {
        data: null,
        error: errorMessage,
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
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      this.logger.error(`${errorMessage}`);
      return {
        data: null,
        error: errorMessage,
      };
    }
  }
}
