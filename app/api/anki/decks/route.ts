import { ankiController } from "@/app/api/modules/anki";

export async function GET() {
  const result = await ankiController.getDecks();

  return new Response(JSON.stringify(result), {
    status: 200,
  });
}
