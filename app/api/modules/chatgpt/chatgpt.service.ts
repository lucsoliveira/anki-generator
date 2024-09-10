import { VoicesTypes } from "./interfaces";

export interface IChatGPT {
  start(message: string): Promise<string | null>;
  generateAudio(
    data: string,
    options: {
      randomVoice: boolean;
      defaultVoice: VoicesTypes;
    }
  ): Promise<any>;
}
