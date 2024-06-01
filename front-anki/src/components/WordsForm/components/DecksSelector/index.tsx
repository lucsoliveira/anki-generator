import { useEffect, useState } from 'react';
import { useFetch } from '../../../../shared/hooks/useFetch';
import { API_PATHS } from '../../../../shared/constants/paths';

export function DeckSelector({ onChangeSelected }: { onChangeSelected: any }) {
  const [decksNames, setDecksNames] = useState<string[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const { request } = useFetch();
  const fetchDecksNames = async () => {
    const options = { method: 'GET', url: API_PATHS.ANKI.DECKS.LIST };

    const response = await request(options);
    const data: {
      data: {
        decks: string[];
      };
    } = response.data;

    const names = data.data.decks;
    return {
      success: true,
      names,
    };
  };
  useEffect(() => {
    fetchDecksNames()
      .then((res) => {
        setDecksNames(res.names);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    if (selectedDeck) {
      onChangeSelected(selectedDeck);
    }
  }, [selectedDeck]);
  return (
    <select
      onChange={(val) => {
        setSelectedDeck(val.currentTarget.value);
      }}
      className="form-select"
      aria-label="Selecione o Deck"
    >
      <option selected>Selecione o Deck</option>
      {decksNames.map((name) => (
        <option value={name}>{name}</option>
      ))}
    </select>
  );
}
