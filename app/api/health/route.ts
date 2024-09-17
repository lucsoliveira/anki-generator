import { ankiConnectService } from "../modules";

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
