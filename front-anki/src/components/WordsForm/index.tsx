import { useState } from 'react';
import { Button } from '../../shared/UI/Button';
import { Box } from '../../shared/UI/Box';
import { PhraseItem } from './types/phrases';
import { DeckSelector } from './components/DecksSelector';

export function WordsForm() {
  const [words, setWords] = useState<string[]>([]);
  const [wordsData, setWordsData] = useState<string>('');
  const [generatedPhrases, setGeneratedPhrases] = useState<PhraseItem[]>([]);
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
      url: 'http://localhost:3001/anki/phrases/generate',
      data: { data: { words: words } },
    };

    // const response = await axios.request(options);

    const response = {
      data: {
        data: {
          texts: [
            {
              word: 'home',
              wordTranslated: 'casa',
              example: {
                phrase: 'I love spending time at <b>home</b>.',
                phraseWithoutFormat: 'I love spending time at home.',
                translated: 'Eu adoro passar tempo em casa.',
              },
            },
            {
              word: 'rain',
              wordTranslated: 'chuva',
              example: {
                phrase:
                  "Don't forget your umbrella, it's <b>rain</b>ing outside.",
                phraseWithoutFormat:
                  "Don't forget your umbrella, it's raining outside.",
                translated:
                  'Não se esqueça do guarda-chuva, está chovendo lá fora.',
              },
            },
            {
              word: 'kitchen',
              wordTranslated: 'cozinha',
              example: {
                phrase: "I'm going to cook something in the <b>kitchen</b>.",
                phraseWithoutFormat:
                  "I'm going to cook something in the kitchen.",
                translated: 'Eu vou cozinhar algo na cozinha.',
              },
            },
          ],
        },
      },
    };

    const res: {
      texts: PhraseItem[];
    } = response.data.data;

    return {
      success: true,
      texts: res.texts,
    };
  }

  async function handleGeneratePhrases() {
    // setWords([]);
    console.log({ words });
    postGeneratePhrases(words)
      .then((res) => {
        console.log({ res });
        setGeneratedPhrases(res.texts);
      })
      .catch((error) => {})
      .finally(() => {});
  }
  return (
    <div>
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

        <div>
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
        </div>
        <div>
          {words.length > 0 && (
            <Button onClick={handleCleanWords}>Limpar</Button>
          )}
          {words.length > 0 && (
            <Button onClick={handleGeneratePhrases}>Gerar Frases</Button>
          )}
        </div>
      </div>

      <Box title="Resultados">
        <div
          className="list-group"
          style={{
            maxHeight: '300px',
            overflow: 'auto',
          }}
        >
          {generatedPhrases.map((item) => (
            <a className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5>{item.word}</h5>
                <small>
                  <Button>Remover</Button>
                </small>
              </div>
              <p>{item.example.phraseWithoutFormat}</p>
              <small>{item.example.translated}</small>
            </a>
          ))}
        </div>

        <div>
          <DeckSelector
            onChangeSelected={(val) => {
              console.log({ val });
            }}
          />
          <Button onClick={() => {}}>Adicionar ao Anki</Button>
        </div>
      </Box>
    </div>
  );
}
