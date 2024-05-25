import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ChatgptService {
  private client = new OpenAI();
  private readonly logger = new Logger(ChatgptService.name);
  private VOICES_GPT = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];

  constructor() {}

  async start(message: string) {
    this.logger.verbose(`start -> input: ${message}`);
    const completion = await this.client.chat.completions.create({
      messages: [{ role: 'system', content: message }],
      model: 'gpt-3.5-turbo-0125',
    });

    return completion.choices[0].message.content;
  }

  async generateAudio(data: string) {
    return await this.client.audio.speech.create({
      model: 'tts-1',
      //@ts-ignore
      voice: this.getRandomVoice() ?? 'alloy',
      input: data,
    });
  }

  private getRandomVoice() {
    const randomIndex = Math.floor(Math.random() * this.VOICES_GPT.length);
    return this.VOICES_GPT[randomIndex];
  }
}
