import { ChatgptServiceOpenAI } from "../chatgpt/openai.service";
import { VoicesTypes } from "../chatgpt/interfaces";
import { FilesService } from "../files/files.service";
import { AnkiConnect } from "../anki-connect/ankiconnect";
import { ResultPhrasesDTO, ItemPhraseDTO, CardDataDTO, Language } from "./dto";
import { PROMPT_PHRASES } from "./prompts";

export class AnkiService {
  private readonly logger = console;
  constructor(
    private gptService: ChatgptServiceOpenAI,
    private filesService: FilesService,
    private ankiConnectService: AnkiConnect
  ) {}
  async generatePhrases(words: string[], language: Language = "en") {
    const normalizeWords = words.join(",").toLocaleLowerCase();
    const message = PROMPT_PHRASES(normalizeWords, language);
    const response = await this.gptService.start(message);
    if (!response) {
      throw new Error("Failed to generate phrases: empty response from GPT");
    }
    const result: ResultPhrasesDTO = JSON.parse(response);
    return result;
  }

  async generateAudios(
    words: ItemPhraseDTO[],
    options: {
      defaultVoice: VoicesTypes;
      randomVoice: boolean;
    },
    language: Language = "en"
  ): Promise<{ word: string; audioPath: string }[]> {
    // language parameter may influence voice choice or logging in the future
    this.logger.debug(`audio generation language: ${language}`);
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
      if (!w.audioPath) {
        throw new Error(`Audio path not found for word: ${w.word}`);
      }
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
