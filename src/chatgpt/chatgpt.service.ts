import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ChatgptService {
  private client = new OpenAI();

  constructor() {}

  async start(message: string) {
    const completion = await this.client.chat.completions.create({
      messages: [{ role: 'system', content: message }],
      model: 'gpt-3.5-turbo-0125',
    });

    return completion.choices[0].message.content;
  }
}
