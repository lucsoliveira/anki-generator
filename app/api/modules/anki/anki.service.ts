import { ChatgptService } from "@/legacy/src/chatgpt/chatgpt.service";
import { FilesService } from "@/legacy/src/files/files.service";
import { AnkiConnectService } from "../../services/anki-connect/anki-connect.service";
import { ResultPhrasesDTO, ItemPhraseDTO, CardDataDTO } from "./dto";
import { PROMPT_PHRASES } from "./prompts";

export class AnkiService {
  private readonly logger = console;
  constructor(
    private gptService: ChatgptService,
    private filesService: FilesService,
    private ankiConnectService: AnkiConnectService
  ) {}
  async generatePhrases(words: string[]) {
    const normalizeWords = words.join(",").toLocaleLowerCase();
    const message = PROMPT_PHRASES(normalizeWords);
    const response = await this.gptService.start(message);
    const result: ResultPhrasesDTO = JSON.parse(response);
    return result;
  }

  async generateAudios(
    words: ItemPhraseDTO[],
    options: {
      defaultVoice: any;
      randomVoice: boolean;
    }
  ): Promise<{ word: string; audioPath: string }[]> {
    const audioPaths: { word: string; audioPath: string }[] = [];
    for (const w of words) {
      const fileName = w.word + ".mp3";
      const audioData = await this.gptService.generateAudio(
        w.example.phraseWithoutFormat,
        {
          defaultVoice: options.defaultVoice,
          randomVoice: options.randomVoice,
        }
      );
      const arrayBuffer = await audioData.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const audioPath = await this.filesService.create(fileName, buffer);
      this.logger.debug(`audioPath ${audioPath}`);
      audioPaths.push({
        word: w.word,
        audioPath: audioPath,
      });
    }

    return audioPaths;
  }

  async generateCardsData(words: ItemPhraseDTO[]): Promise<CardDataDTO[]> {
    const cardsDatas: CardDataDTO[] = [];

    // Upload audio to anki library and get name
    for (const w of words) {
      const randomId = Math.round(Math.random() * 1000);
      const newFileName = w.word + randomId + ".mp3";
      this.logger.debug(`newFileName ${newFileName}`);

      const audioData = await this.filesService.convertToBase64(w.audioPath);
      const audioAnkiLibrary = await this.ankiConnectService.uploadFileToAnki({
        data: audioData,
        fileName: newFileName,
      });

      this.logger.debug(`audio data generated`);
      this.logger.debug(`audioAnkiLibrary ${JSON.stringify(audioAnkiLibrary)}`);

      cardsDatas.push({
        cardFront: w.example.phrase,
        cardBack: w.example.translated,
        audioPath: audioAnkiLibrary.finalPath,
        audioName: audioAnkiLibrary.name,
      });
    }

    return cardsDatas;
  }
}
