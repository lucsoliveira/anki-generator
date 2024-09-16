export type GetDecksNamesDTO = {
  result: string[];
  error: null;
};

export interface CardDataDTO {
  cardFront: string;
  cardBack: string;
  audioPath: string;
  audioName: string;
}

export interface AnkiConnect {
  getDeckes(): Promise<string[]>;
  checkHealth(): Promise<{ status: string }>;
  addNote(
    deckName: string,
    card: CardDataDTO
  ): Promise<{ result: number; error: unknown }>;
  uploadFileToAnki({
    data,
    fileName,
  }: {
    fileName: string;
    data: string;
  }): Promise<{ finalPath: string; name: string }>;
}
