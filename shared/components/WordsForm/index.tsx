"use client";
import { useState } from "react";
import { PhraseItem } from "./types/phrases";
import { DeckSelector } from "./components/DecksSelector";
import { ResultsBoxStyle, WordsFormStyle } from "./styles";
import { ResultsBox } from "./components/ResultsBox";
import { Box } from "../../UI/Box";
import { Button } from "../../UI/Button";
import { Loader, SimpleList, SimpleListItem, TextAreaInput } from "@/shared/UI";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useServices } from "@/shared/hooks";

export function WordsForm() {
  const [words, setWords] = useState<string[]>([]);
  const [wordsData, setWordsData] = useState<string>("");
  const [generatedPhrases, setGeneratedPhrases] = useState<PhraseItem[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [errorGenerateAudio, setErrorOnGenerateAudio] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorOnAddAnki, setErrorOnAddAnki] = useState<boolean>(false);

  function handleAddClick(data: string) {
    const wordsSplitted = data.split("\n");
    setWords(wordsSplitted);
    setWordsData("");
  }

  function handleRemoveWord(wordIndex: number) {
    const wordsNew: string[] = JSON.parse(JSON.stringify(words));
    wordsNew.splice(wordIndex, 1);
    setWords(wordsNew);
  }

  function handleCleanWords() {
    setWords([]);
  }

  const { generatePhrases, generateAudios, addCard } = useServices();

  async function handleGeneratePhrases() {
    // setWords([]);
    setIsLoading(true);
    generatePhrases(words)
      .then((res) => {
        setGeneratedPhrases(res.texts);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function handleGenerateAudios() {
    setErrorOnGenerateAudio(false);
    setIsLoading(true);
    generateAudios(generatedPhrases)
      .then((res) => {
        const audios = res.audios;
        const phrases = JSON.parse(JSON.stringify(generatedPhrases));
        const phrasesWithAudio = phrases.map((item) => {
          const audio = audios.filter((a) => a.word === item.word);

          return {
            ...item,
            audioPath: audio.length > 0 ? audio[0] : null,
          };
        });

        setGeneratedPhrases(phrasesWithAudio);
      })
      .catch(() => {
        setErrorOnGenerateAudio(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function handleAddAnki() {
    if (selectedDeck) {
      setErrorOnAddAnki(false);
      setIsLoading(true);
      addCard(selectedDeck, generatedPhrases)
        .then((res) => {})
        .catch(() => {
          setErrorOnAddAnki(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <Box title="Gerador de Frases">
      <WordsFormStyle>
        <TextAreaInput
          label="Palavras"
          value={wordsData}
          placeholder="Palavras separadas por quebra de linha"
          onChange={(val) => {
            setWordsData(val);
          }}
        />

        <Button
          onClick={() => {
            handleAddClick(wordsData);
          }}
        >
          Adicionar
        </Button>
        <ResultsBoxStyle>
          <SimpleList>
            {words.map((val, index) => {
              return (
                <SimpleListItem
                  id={`word-${index}`}
                  value={val}
                  key={`word-${index}`}
                  onClick={() => {}}
                  actions={
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      onClick={() => {
                        handleRemoveWord(index);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                ></SimpleListItem>
              );
            })}
          </SimpleList>
        </ResultsBoxStyle>

        <div>
          {words.length > 0 && (
            <Button onClick={handleCleanWords} variant="secondary">
              Limpar
            </Button>
          )}
          {words.length > 0 && (
            <Button onClick={handleGeneratePhrases}>Gerar Frases</Button>
          )}

          {isLoading && <Loader />}
        </div>
      </WordsFormStyle>

      {generatedPhrases.length > 0 && (
        <Box title="Resultados">
          <ResultsBox phrases={generatedPhrases} />
          <Button onClick={handleGenerateAudios}>Gerar Audios</Button>

          {isLoading && <p>Carregando</p>}

          {errorGenerateAudio && <p>Erro ao gerar o audio.</p>}
          <div>
            <DeckSelector
              onChangeSelected={(val) => {
                setSelectedDeck(val);
              }}
            />
            {selectedDeck && (
              <>
                <Button onClick={handleAddAnki} disabled={isLoading}>
                  Adicionar ao Anki
                </Button>
                {isLoading && <p>Carregando...</p>}
                {errorOnAddAnki && <p>Erro ao adicionar ao Anki.</p>}
              </>
            )}
          </div>
        </Box>
      )}
    </Box>
  );
}
