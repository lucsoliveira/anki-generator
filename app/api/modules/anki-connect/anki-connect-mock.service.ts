import { AnkiConnect, CardDataDTO } from "./ankiconnect";

export class AnkiConnectMock implements AnkiConnect {
  async getDeckes() {
    return ["Deck 1", "Deck 2", "Deck 3"];
  }

  async checkHealth(): Promise<{ status: string }> {
    return {
      status: "OK",
    };
  }

  async addNote(
    deckName: string,
    card: CardDataDTO
  ): Promise<{ result: number; error: unknown }> {
    return {
      result: 1,
      error: null,
    };
  }

  async uploadFileToAnki({
    fileName,
    data,
  }: {
    fileName: string;
    data: string;
  }): Promise<{ finalPath: string; name: string }> {
    return {
      finalPath: "/path/to/file",
      name: fileName,
    };
  }
}
