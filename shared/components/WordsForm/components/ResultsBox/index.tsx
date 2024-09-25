import { Card } from "@/shared/UI/Card";
import { PhraseItem } from "../../types/phrases";
import { ResultsBoxStyle, ResultsScroll } from "./style";
import { Typography } from "@mui/material";

export function ResultsBox({ phrases }: { phrases: PhraseItem[] }) {
  return (
    <ResultsBoxStyle>
      <ResultsScroll>
        {phrases.map((item, index) => (
          <Card key={index} title={item.word} subtitle={item.wordTranslated}>
            <Typography>{item.example.phraseWithoutFormat}</Typography>
            <small>{item.example.translated}</small>

            {item.audioPath && (
              <audio controls>
                <source src={item.audioPath?.audioPath} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </Card>
        ))}
      </ResultsScroll>
    </ResultsBoxStyle>
  );
}
