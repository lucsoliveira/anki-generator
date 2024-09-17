import { ankiController } from "../../modules";

export async function GET() {
  const result = await ankiController.getDecks();

  return new Response(JSON.stringify(result), {
    status: 200,
  });
}
