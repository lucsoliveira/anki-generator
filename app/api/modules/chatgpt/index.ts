import { ChatgptServiceOpenAI } from "./openai.service";
import { TestGPTService } from "./test-gpt.service";

export const openAIGPT = new ChatgptServiceOpenAI();
export const testGPT = new TestGPTService();
