import OpenAI from "openai";
import { VoicesTypes } from "./interfaces";
import { IChatGPT } from "./chatgpt.service";

export class ChatgptServiceOpenAI implements IChatGPT {
  private client = new OpenAI();
  private readonly logger = console;
  private VOICES_GPT: VoicesTypes[] = [
    "alloy",
    "echo",
    "fable",
    "onyx",
    "nova",
    "shimmer",
  ];

  constructor() {}

  async start(message: string): Promise<string | null> {
    this.logger.debug(`start -> input: ${message}`);
    const completion = await this.client.chat.completions.create({
      messages: [{ role: "system", content: message }],
      model: "gpt-3.5-turbo-0125",
    });

    return completion.choices[0].message.content;
  }

  async generateAudio(
    data: string,
    options: {
      randomVoice: boolean;
      defaultVoice: VoicesTypes;
    }
  ) {
    const voiceType = options.randomVoice
      ? this.getRandomVoice()
      : options.defaultVoice;
    return await this.client.audio.speech.create({
      model: "tts-1",
      voice: voiceType,
      input: data,
    });
  }

  private getRandomVoice(): VoicesTypes {
    const randomIndex = Math.floor(Math.random() * this.VOICES_GPT.length);
    return this.VOICES_GPT[randomIndex];
  }
}
