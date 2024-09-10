import { ankiController } from "@/app/api/modules/anki";
import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
  const data = await req.json();

  const result = await ankiController.generateCards({
    data: {
      texts: data.data.texts,
    },
  });

  console.log({ result });

  return new Response(JSON.stringify(result), {
    status: 200,
  });
}
