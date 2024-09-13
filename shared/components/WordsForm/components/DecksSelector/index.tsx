import { API_PATHS } from "@/shared/constants/paths";
import { useFetch } from "@/shared/hooks/useFetch";
import { SingleSelect } from "@/shared/UI";
import { useEffect, useState } from "react";

export function DeckSelector({
  onChangeSelected,
}: {
  onChangeSelected: (deck: string) => unknown;
}) {
  const [decksNames, setDecksNames] = useState<string[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<string | undefined>(
    undefined
  );
  const { request } = useFetch();
  const fetchDecksNames = async () => {
    const options = { method: "GET", url: API_PATHS.ANKI.DECKS.LIST };

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
    <>
      <SingleSelect.Selector
        label="Deck"
        value={selectedDeck}
        onChange={(val) => {
          setSelectedDeck(val);
        }}
        values={decksNames.map((d) => {
          return {
            label: d,
            value: d,
          };
        })}
      />
    </>
  );
}
