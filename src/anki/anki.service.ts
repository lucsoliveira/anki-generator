import { Injectable } from '@nestjs/common';
import { ChatgptService } from 'src/chatgpt/chatgpt.service';
import { CardDataDTO, ItemPhraseDTO, ResultPhrasesDTO } from './dto';
import { PROMPT_PHRASES } from './prompts';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class AnkiService {
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

  async generateCardsAudios(words: ItemPhraseDTO[]) {
    const cardsDatas: CardDataDTO[] = [];
    for (const w of words) {
      const fileName = w.word + '.mp3';
      const audioData = await this.gptService.generateAudio(
        w.example.phraseWithoutFormat,
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

  async addCardsToAnkiLocal(audio) {}
}
