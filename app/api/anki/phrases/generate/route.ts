import { ankiController } from "@/app/api/modules";

export async function POST(req: Request) {
  const data = await req.json();

  const result = await ankiController.generatePhrases({
    data: {
      words: data.data.words,
      language: data.data.language,
    },
  });

  return new Response(JSON.stringify(result), {
    status: 200,
  });
}
