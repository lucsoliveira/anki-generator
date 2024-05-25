import { Injectable, Logger } from '@nestjs/common';
import { ChatgptService } from 'src/chatgpt/chatgpt.service';
import { CardDataDTO, ItemPhraseDTO, ResultPhrasesDTO } from './dto';
import { PROMPT_PHRASES } from './prompts';
import { FilesService } from 'src/files/files.service';
import axios from 'axios';

@Injectable()
export class AnkiService {
  private readonly logger = new Logger(AnkiService.name);
  constructor(
    private gptService: ChatgptService,
    private filesService: FilesService,
  ) {}
  async generatePhrases(words: string[]) {
    const normalizeWords = words.join(',').toLocaleLowerCase();
    const message = PROMPT_PHRASES(normalizeWords);
    const response = await this.gptService.start(message);
    const result: ResultPhrasesDTO = JSON.parse(response);
    return result;
  }

  async generateCardsAudios(words: ItemPhraseDTO[]): Promise<CardDataDTO[]> {
    const cardsDatas: CardDataDTO[] = [];
    for (const w of words) {
      const fileName = w.word + '.mp3';
      const audioData = await this.gptService.generateAudio(
        w.example.phraseWithoutFormat,
        {
          defaultVoice: 'alloy',
          randomVoice: true,
        },
      );
      const arrayBuffer = await audioData.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const audioPath = await this.filesService.create(fileName, buffer);
      cardsDatas.push({
        cardFront: w.example.phrase,
        cardBack: w.example.translated,
        audioPath: audioPath,
      });
    }

    return cardsDatas;
  }

  // TODO: finalizar
  async addCardsToAnkiLocal(cards: CardDataDTO[]) {}

  // TODO: lembrar do funcionamento da rota de storeMediaFile
  async uploadFileToAnki({
    pathAudio,
    fileName,
  }: {
    fileName: string;
    pathAudio: string;
  }) {
    let result: any;
    try {
      const fileUrl = `http://localhost:3000/uploads?fileName=${fileName}`;

      this.logger.debug(
        `[ANKIAPI] creating file ${fileName} path ${pathAudio}`,
      );

      const body = {
        action: 'storeMediaFile',
        version: 6,
        params: {
          filename: fileName,
          url: fileUrl,
        },
      };

      const _result = await axios.request({
        baseURL: 'http://localhost:8765/',
        data: body,
      });

      const data = _result.data;

      result = data;
      this.logger.debug(`[ANKIAPI] success file ${fileName}`);
    } catch (error: any) {
      this.logger.error(`[ANKIAPI] error: ${error.message}`);
      result = null;
    }

    return result;
  }
}
