import { Language } from "../dto";

export const PROMPT_PHRASES = (words: string, language: Language) => {
  // determine human readable names for the languages
  const targetName = language === "en" ? "inglês" : language === "pt" ? "português" : "francês";
  // translate examples to Portuguese for all non-pt languages; if generating portuguese, translate to English
  const translateToName = language === "pt" ? "inglês" : "português";

  return `Atue como um bom organizador de informações e buscador de palavras em contextos específicos e gere para mim um array JSON de frases com o seguinte formato:
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
  Me retorne somente o JSON sem nenhum texto extra. Corrija as frases, se necessario, e gere um JSON válido. Remova aspas.
  Gere o array apenas com as seguintes palavras: ${words}
  Não se esqueça de traduzir a palavra e preencher os exemplos com frases em ${targetName} e ${translateToName}.
  `
    .replaceAll('"', "")
    .replaceAll("'", "");
};
