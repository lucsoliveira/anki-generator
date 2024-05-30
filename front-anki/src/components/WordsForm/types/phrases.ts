export type PhraseItem = {
  word: string;
  wordTranslated: string;
  example: {
    phrase: string;
    phraseWithoutFormat: string;
    translated: string;
  };
  audioPath?: {
    audioPath: string;
    word: string;
  };
};
