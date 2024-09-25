import { PhraseItem } from "../components/WordsForm/types/phrases";
import { API_PATHS } from "../constants/paths";
import { useAPI } from "../hooks";

export const AudioServices = () => {
  const { request } = useAPI();

  async function generateAudios(phrases: PhraseItem[]) {
    const options = {
      method: "POST",
      url: API_PATHS.ANKI.PHRASES.AUDIO,
      data: {
        data: {
          texts: phrases,
        },
      },
    };

    const response = await request(options);

    const data: {
      data: {
        audios: {
          word: string;
          audioPath: string;
        }[];
      };
    } = response.data;

    return {
      success: true,
      audios: data.data.audios,
    };
  }

  return {
    generateAudios,
  };
};
