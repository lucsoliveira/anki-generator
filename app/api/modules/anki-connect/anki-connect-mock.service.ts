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
    _deckName: string, // eslint-disable-line @typescript-eslint/no-unused-vars
    _card: CardDataDTO // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Promise<{ result: number; error: unknown }> {
    return {
      result: 1,
      error: null,
    };
  }

  async uploadFileToAnki({
    fileName,
    data, // eslint-disable-line @typescript-eslint/no-unused-vars
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
