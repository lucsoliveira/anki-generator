import { ankiConnectService } from "../anki-connect";
import { HealthController } from "./health.controller";

export const healthController = new HealthController(ankiConnectService);
