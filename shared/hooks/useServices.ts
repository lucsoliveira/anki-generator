import { AudioServices, HealthServices } from "../services";
import { AnkiServices } from "../services/anki";

export function useServices() {
  const { generatePhrases, addCard } = AnkiServices();
  const { generateAudios } = AudioServices();
  const { getHealth } = HealthServices();

  return {
    generatePhrases,
    generateAudios,
    addCard,
    getHealth,
  };
}
