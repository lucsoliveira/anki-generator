import { describe, it, expect, vi, beforeEach } from "vitest";
import { AnkiService } from "./anki.service";

describe("AnkiService", () => {
  let mockGptService: Record<string, unknown>;
  let mockFilesService: Record<string, unknown>;
  let mockAnkiConnectService: Record<string, unknown>;
  let service: AnkiService;

  beforeEach(() => {
    mockGptService = {
      start: vi.fn(),
      generateAudio: vi.fn(),
    };

    mockFilesService = {
      create: vi.fn(),
      convertToBase64: vi.fn(),
    };

    mockAnkiConnectService = {
      uploadFileToAnki: vi.fn(),
    };

    service = new AnkiService(
      mockGptService,
      mockFilesService,
      mockAnkiConnectService
    );
  });

  it("generatePhrases - parses GPT response", async () => {
    const fake = { phrases: [{ word: "w" }] };
    mockGptService.start.mockResolvedValue(JSON.stringify(fake));

    const res = await service.generatePhrases(["a"], "fr");

    expect(res).toEqual(fake);
  });

  it("generateAudios - creates files and returns paths", async () => {
    const words = [{ word: "w", example: { phraseWithoutFormat: "p" } }];

    mockGptService.generateAudio.mockResolvedValue({
      arrayBuffer: async () => Uint8Array.from([1, 2, 3]).buffer,
    });

    mockFilesService.create.mockResolvedValue("/public/uploads/f.mp3");

    const res = await service.generateAudios(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      words as any,
      {
        defaultVoice: "v",
        randomVoice: false,
      },
      "pt"
    );

    expect(res[0].word).toBe("w");
    expect(res[0].audioPath).toBe("/public/uploads/f.mp3");
  });

  it("generateCardsData - uploads files and returns card data", async () => {
    const words = [
      {
        audioPath: "/tmp/a.mp3",
        word: "w",
        example: { phrase: "front", translated: "back" },
      },
    ];

    mockFilesService.convertToBase64.mockResolvedValue("base64data");
    mockAnkiConnectService.uploadFileToAnki.mockResolvedValue({
      finalPath: "/collection/media/a123.mp3",
      name: "a123.mp3",
    });

    const res = await service.generateCardsData(words as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(res[0].cardFront).toBe("front");
    expect(res[0].cardBack).toBe("back");
    expect(res[0].audioPath).toBe("/collection/media/a123.mp3");
    expect(res[0].audioName).toBe("a123.mp3");
  });
});
