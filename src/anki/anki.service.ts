import { Injectable } from '@nestjs/common';
import { ChatgptService } from 'src/chatgpt/chatgpt.service';
import { ResultPhrasesDTO } from './interfaces';
import { PROMPT_PHRASES } from './prompts';

@Injectable()
export class AnkiService {
  constructor(private gptService: ChatgptService) {}
  async generatePhrases(words: string[]) {
    const normalizeWords = words.join(',').toLocaleLowerCase();

    const message = PROMPT_PHRASES(normalizeWords);
    const response = await this.gptService.start(message);

    const result: ResultPhrasesDTO = JSON.parse(response);

    return result;
  }
}
