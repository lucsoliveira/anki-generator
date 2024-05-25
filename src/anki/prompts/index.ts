export const PROMPT_PHRASES = (
  words: string,
) => `Atue como um bom organizador de informações e buscador de palavras em contextos específicos e gere para mim um array JSON de frases com o seguinte formato: 
  "texts": [
    {
      "word": "Hence",
      "wordTranslated": "Portanto",
      "example": {
        "phrase": "She missed the bus; <br>hence</b>, she had to take a taxi.",
        "phraseWithoutFormat": "She missed the bus; hence, she had to take a taxi.",
        "translated": "Ela perdeu o ônibus; <br>portanto</b>, ela teve que pegar um táxi."
      }
    }
  ]

-----
Me retorne somente o JSON sem nenhum texto extra.
Gere o array apenas com as seguintes palavras: ${words}
`;
