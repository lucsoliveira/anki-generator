import { AnkiController, AnkiService } from "./anki";
import { AnkiConnectServiceV1 } from "./anki-connect";
import { ChatgptServiceOpenAI, TestGPTService } from "./chatgpt";
import { FilesService } from "./files";

export const ankiConnectService = new AnkiConnectServiceV1();
export const openAIGPT = new ChatgptServiceOpenAI();
export const testGPT = new TestGPTService();
export const filesService = new FilesService();
export const ankiService = new AnkiService(
  testGPT,
  filesService,
  ankiConnectService
);

export const ankiController = new AnkiController(
  ankiService,
  ankiConnectService
);
