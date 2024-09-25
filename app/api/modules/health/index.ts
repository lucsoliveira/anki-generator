import { ankiConnectService } from "..";
import { HealthController } from "./health.controller";

export const healthController = new HealthController(ankiConnectService);
