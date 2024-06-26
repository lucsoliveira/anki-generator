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
  audioPath?: string;
}

export interface ResultPhrasesDTO {
  texts: ItemPhraseDTO[];
}
