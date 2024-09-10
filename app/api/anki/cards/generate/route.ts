import { ankiController } from "@/app/api/modules/anki";
import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
  const body = await req.json();
  const result = await ankiController.generateCardsAndSync({
    data: {
      deckName: body.data.deckName,
      texts: body.data.texts,
    },
  });

  return new Response(JSON.stringify(result), {
    status: 200,
  });
}
