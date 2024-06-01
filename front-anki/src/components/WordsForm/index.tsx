import { useState } from 'react';
import { Button } from '../../shared/UI/Button';
import { PhraseItem } from './types/phrases';
import { DeckSelector } from './components/DecksSelector';
import { useFetch } from '../../shared/hooks/useFetch';
import { API_PATHS } from '../../shared/constants/paths';
import { WordsFormStyle } from './styles';
import { ResultsBox } from './components/ResultsBox';
import { Box } from '../../shared/UI/Box';

export function WordsForm() {
  const [words, setWords] = useState<string[]>([]);
  const [wordsData, setWordsData] = useState<string>('');
  const [generatedPhrases, setGeneratedPhrases] = useState<PhraseItem[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [errorGenerateAudio, setErrorOnGenerateAudio] =
    useState<boolean>(false);

  const [errorOnAddAnki, setErrorOnAddAnki] = useState<boolean>(false);
  const { request } = useFetch();

  function handleAddClick(data: string) {
    const wordsSplitted = data.split('\n');
    setWords(wordsSplitted);
    setWordsData('');
  }

  function handleRemoveWord(wordIndex: number) {
    const wordsNew: string[] = JSON.parse(JSON.stringify(words));
    wordsNew.splice(wordIndex, 1);
    setWords(wordsNew);
  }

  function handleCleanWords() {
    setWords([]);
  }

  async function postGeneratePhrases(words: string[]) {
    const options = {
      method: 'POST',
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

  async function postGenerateAudios(phrases: PhraseItem[]) {
    const options = {
      method: 'POST',
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

  async function postAddAnki(deckName: string, phrases: PhraseItem[]) {
    const normalizedPhrases = phrases.map((item) => {
      return {
        ...item,
        audioPath: item.audioPath?.audioPath,
      };
    });
    const options = {
      method: 'POST',
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

  async function handleGeneratePhrases() {
    // setWords([]);
    postGeneratePhrases(words)
      .then((res) => {
        console.log({ res });
        setGeneratedPhrases(res.texts);
      })
      .catch(() => {})
      .finally(() => {});
  }

  async function handleGenerateAudios() {
    setErrorOnGenerateAudio(false);
    postGenerateAudios(generatedPhrases)
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
      .finally(() => {});
  }

  async function handleAddAnki() {
    if (selectedDeck) {
      setErrorOnAddAnki(false);
      postAddAnki(selectedDeck, generatedPhrases)
        .then((res) => {})
        .catch(() => {
          setErrorOnAddAnki(true);
        })
        .finally(() => {});
    }
  }

  return (
    <WordsFormStyle>
      <Box title="Gerador de Frases" padding={10}>
        <div>
          <label htmlFor="formGroupExampleInput" className="form-label">
            <p>Cole aqui as palavras separadas por linhas</p>
          </label>
          <textarea
            value={wordsData}
            onChange={(event) => {
              setWordsData(event.currentTarget.value);
            }}
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Palavras separadas por quebra de linha"
          />
          <Button
            onClick={() => {
              handleAddClick(wordsData);
            }}
          >
            Adicionar
          </Button>
        </div>
        <div>
          <div
            style={{
              maxHeight: '300px',
              overflow: 'auto',
            }}
          >
            <ol className="list-group list-group-numbered">
              {words.map((val, index) => {
                return (
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{val}</div>
                    </div>
                    <span
                      style={{
                        cursor: 'pointer',
                      }}
                      aria-label="Remover palavra"
                      className="badge text-bg-danger rounded-pill"
                      onClick={() => {
                        handleRemoveWord(index);
                      }}
                    >
                      x
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* <div>
          <select className="form-select" aria-label="Idioma de entrada">
            <option selected>Idioma de entrada</option>
            <option value="3">PT-BR</option>
            <option value="3">EN</option>
          </select>

          <select className="form-select" aria-label="Idioma de saída">
            <option selected>Idioma de saída</option>
            <option value="3">PT-BR</option>
            <option value="3">EN</option>
          </select>
        </div> */}
          <div>
            {words.length > 0 && (
              <Button onClick={handleCleanWords} variant="secondary">
                Limpar
              </Button>
            )}
            {words.length > 0 && (
              <Button onClick={handleGeneratePhrases}>Gerar Frases</Button>
            )}
          </div>
        </div>
      </Box>

      {generatedPhrases.length > 0 && (
        <Box title="Resultados" padding={10}>
          <ResultsBox phrases={generatedPhrases} />
          <Button onClick={handleGenerateAudios}>Gerar Audios</Button>

          {errorGenerateAudio && <p>Erro ao gerar o audio.</p>}
          <div>
            <DeckSelector
              onChangeSelected={(val) => {
                setSelectedDeck(val);
              }}
            />
            {selectedDeck && (
              <>
                <Button onClick={handleAddAnki}>Adicionar ao Anki</Button>
                {errorOnAddAnki && <p>Erro ao adicionar ao Anki.</p>}
              </>
            )}
          </div>
        </Box>
      )}
    </WordsFormStyle>
  );
}
