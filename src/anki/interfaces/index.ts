export interface ResultPhrasesDTO {
  texts: {
    word: string;
    wordTranslated: string;
    example: {
      phrase: string;
      phraseWithoutFormat: string;
      translated: string;
    };
  }[];
}
