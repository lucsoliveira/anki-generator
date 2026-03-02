import { ankiController } from "@/app/api/modules";
import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
  const data = await req.json();

  const result = await ankiController.generateCards({
    data: {
      texts: data.data.texts,
      // language is currently unused by controller but forwarded for future use
      language: data.data.language,
    },
  });

  console.log({ result });

  return new Response(JSON.stringify(result), {
    status: 200,
  });
}
