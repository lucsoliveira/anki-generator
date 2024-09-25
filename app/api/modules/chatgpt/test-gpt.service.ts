import { VoicesTypes } from "./interfaces";
import { IChatGPT } from "./chatgpt.service";
import { setTimeout } from "timers/promises";

export class TestGPTService implements IChatGPT {
  private readonly logger = console;

  constructor() {}

  async start(message: string): Promise<string | null> {
    this.logger.debug(`start -> input: ${message}`);

    const data = {
      texts: [
        {
          word: "Hence",
          wordTranslated: "Portanto",
          example: {
            phrase:
              "She missed the bus; <br>hence</b>, she had to take a taxi.",
            phraseWithoutFormat:
              "She missed the bus; hence, she had to take a taxi.",
            translated:
              "Ela perdeu o ônibus; <br>portanto</b>, ela teve que pegar um táxi.",
          },
        },
        {
          word: "World",
          wordTranslated: "Mundo",
          example: {
            phrase:
              "She missed the bus; <br>hence</b>, she had to take a taxi.",
            phraseWithoutFormat:
              "She missed the bus; hence, she had to take a taxi.",
            translated:
              "Ela perdeu o ônibus; <br>portanto</b>, ela teve que pegar um táxi.",
          },
        },
        {
          word: "Welcome",
          wordTranslated: "Bemvindo",
          example: {
            phrase:
              "She missed the bus; <br>hence</b>, she had to take a taxi.",
            phraseWithoutFormat:
              "She missed the bus; hence, she had to take a taxi.",
            translated:
              "Ela perdeu o ônibus; <br>portanto</b>, ela teve que pegar um táxi.",
          },
        },
      ],
    };

    await setTimeout(1200);
    return JSON.stringify(data);
  }

  async generateAudio(
    data: string,
    options: {
      randomVoice: boolean;
      defaultVoice: VoicesTypes;
    }
  ) {
    return null;
  }
}
