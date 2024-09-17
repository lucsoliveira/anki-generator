import { PhraseItem } from "../components/WordsForm/types/phrases";
import { API_PATHS } from "../constants/paths";
import { useAPI } from "../hooks";

export const AnkiServices = () => {
  const { request } = useAPI();

  async function generatePhrases(words: string[]) {
    const options = {
      method: "POST",
      url: API_PATHS.ANKI.PHRASES.GENERATE,
      data: { data: { words: words } },
    };

    const response = await request(options);

    const res: {
      texts: PhraseItem[];
    } = response.data.data;

    return {
      success: true,
      texts: res.texts,
    };
  }

  async function addCard(deckName: string, phrases: PhraseItem[]) {
    const normalizedPhrases = phrases.map((item) => {
      return {
        ...item,
        audioPath: item.audioPath?.audioPath,
      };
    });
    const options = {
      method: "POST",
      url: API_PATHS.ANKI.CARDS.GENERATE,
      data: {
        data: {
          deckName: deckName,
          texts: normalizedPhrases,
        },
      },
    };

    const result = await request(options);

    const data: {
      data: {
        cardsData: {
          cardFront: string;
          cardBack: string;
          audioPath: string;
          audioName: string;
        }[];
      };
    } = result.data;
    return {
      cardsData: data.data.cardsData,
    };
  }

  return {
    generatePhrases,
    addCard,
  };
};
