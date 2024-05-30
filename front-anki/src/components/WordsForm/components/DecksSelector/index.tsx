import axios from 'axios';
import { useEffect, useState } from 'react';

export function DeckSelector({ onChangeSelected }: { onChangeSelected: any }) {
  const [decksNames, setDecksNames] = useState<string[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);

  const fetchDecksNames = async () => {
    const options = { method: 'GET', url: 'http://localhost:3001/anki/decks' };

    const response = await axios.request(options);
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
