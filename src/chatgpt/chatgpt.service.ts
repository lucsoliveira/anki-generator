import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ChatgptService {
  private client = new OpenAI();
  private readonly logger = new Logger(ChatgptService.name);
  constructor() {}

  async start(message: string) {
    this.logger.verbose(`start -> input: ${message}`);
    const completion = await this.client.chat.completions.create({
      messages: [{ role: 'system', content: message }],
      model: 'gpt-3.5-turbo-0125',
    });

    return completion.choices[0].message.content;
  }
}
