import { ankiConnectService } from "../modules/anki-connect";

export async function GET() {
  const res = {
    data: {
      api: {
        status: "UP",
        uptime: process.uptime(),
      },
      ankiConnect: await ankiConnectService.checkHealth(),
    },
  };
  return new Response(JSON.stringify(res), {
    status: 200,
  });
}
