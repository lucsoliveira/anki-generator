import { useState } from 'react';
import { Button } from '../../shared/UI/Button';

export function WordsForm() {
  const [words, setWords] = useState<string[]>([]);
  const [wordsData, setWordsData] = useState<string>('');
  function handleAddClick(data: string) {
    console.log({ data });
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

  function handleGeneratePhrases() {
    // setWords([]);
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
    </div>
  );
}
