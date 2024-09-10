import { ankiConnectService } from "../anki-connect";
import { chatGPTService } from "../chatgpt";
import { filesService } from "../files";
import { AnkiController } from "./anki.controller";
import { AnkiService } from "./anki.service";

export const ankiService = new AnkiService(
  chatGPTService,
  filesService,
  ankiConnectService
);

export const ankiController = new AnkiController(
  ankiService,
  ankiConnectService
);
