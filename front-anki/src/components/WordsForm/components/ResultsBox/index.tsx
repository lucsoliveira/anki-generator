import { PhraseItem } from '../../types/phrases';
import { ResultsBoxStyle } from './style';

export function ResultsBox({ phrases }: { phrases: PhraseItem[] }) {
  return (
    <ResultsBoxStyle>
      <div className="list-group">
        {phrases.map((item) => (
          <a className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5>{item.word}</h5>
              <small>{/* <Button>Remover</Button> */}</small>
            </div>
            <p>{item.example.phraseWithoutFormat}</p>
            <small>{item.example.translated}</small>
            <small>{item.example.translated}</small>

            {item.audioPath && (
              <audio controls>
                <source src="audios/person.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </a>
        ))}
      </div>
    </ResultsBoxStyle>
  );
}
