// supported output languages for phrase/audio generation
export type Language = "pt" | "en" | "fr";

export interface CardDataDTO {
  cardFront: string;
  cardBack: string;
  audioPath: string;
  audioName: string;
}
export interface ItemPhraseDTO {
  word: string;
  wordTranslated: string;
  example: {
    phrase: string;
    phraseWithoutFormat: string;
    translated: string;
  };
  // optional when audio hasn't been generated yet
  audioPath?: string;
}

export interface ResultPhrasesDTO {
  texts: ItemPhraseDTO[];
}
