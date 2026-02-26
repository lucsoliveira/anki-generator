import { describe, it, expect, vi, beforeEach } from "vitest";
import { AnkiController } from "./anki.controller";

describe("AnkiController", () => {
  let mockAnkiService: any;
  let mockAnkiConnect: any;
  let controller: AnkiController;

  beforeEach(() => {
    mockAnkiService = {
      generatePhrases: vi.fn(),
      generateAudios: vi.fn(),
      generateCardsData: vi.fn(),
    };

    mockAnkiConnect = {
      addNote: vi.fn(),
      getDeckes: vi.fn(),
    };

    controller = new AnkiController(mockAnkiService, mockAnkiConnect);
  });

  it("generatePhrases - success", async () => {
    const fakeResult = {
      phrases: [{ word: "w", example: { phrase: "p", translated: "t" } }],
    };
    mockAnkiService.generatePhrases.mockResolvedValue(fakeResult);

    const res = await controller.generatePhrases({
      data: { words: ["hello"] },
    });

    expect(res.data).toEqual(fakeResult);
    expect(res.error).toBeUndefined();
  });

  it("generatePhrases - error", async () => {
    mockAnkiService.generatePhrases.mockRejectedValue(new Error("fail"));

    const res = await controller.generatePhrases({ data: { words: ["x"] } });

    expect(res.data).toBeNull();
    expect(res.error).toBe("fail");
  });

  it("generateCards - normalizes audio paths and names", async () => {
    const texts = [
      {
        word: "w",
        example: { phrase: "p", phraseWithoutFormat: "p", translated: "t" },
      },
    ];

    mockAnkiService.generateAudios.mockResolvedValue([
      { word: "w", audioPath: "/public/uploads/myfile.mp3" },
    ]);

    const res = await controller.generateCards({ data: { texts } });

    expect(res.data).toBeDefined();
    const audios = res.data.audios;
    expect(audios[0].audioPath).toBe("/uploads/myfile.mp3");
    expect(audios[0].audioName).toBe("myfile.mp3");
  });

  it("generateCardsAndSync - calls addNote and returns cardsData", async () => {
    const cards = [
      { cardFront: "f", cardBack: "b", audioPath: "/x", audioName: "n.mp3" },
    ];

    mockAnkiService.generateCardsData.mockResolvedValue(cards);
    mockAnkiConnect.addNote.mockResolvedValue({ result: 1 });

    const res = await controller.generateCardsAndSync({
      data: { deckName: "deck1", texts: [] },
    });

    expect(mockAnkiConnect.addNote).toHaveBeenCalledTimes(cards.length);
    expect(res.data.cardsData).toEqual(cards);
  });

  it("getDecks - returns decks", async () => {
    mockAnkiConnect.getDeckes.mockResolvedValue(["deck1", "deck2"]);

    const res = await controller.getDecks();

    expect(res.data.decks).toEqual(["deck1", "deck2"]);
  });
});
