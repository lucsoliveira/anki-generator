import { GetDecksNamesDTO } from "./types/decks";
import axios from "axios";
import { CardDataDTO } from "../anki/dto";
import { resolve } from "path";
import { PATHS } from "../../../constants/paths";
import { AnkiConnect } from "./ankiconnect";

/**
 * V1 refs to the version of the AnkiConnect API 2024-07-26
 */
export class AnkiConnectServiceV1 implements AnkiConnect {
  private readonly logger = console;
  private COLLECTION_MEDIAS_PATH = PATHS.ANKI.COLLECTION_MEDIAS;
  protected client = axios.create({
    baseURL: process.env.ANKI_CONNECT_HOST_API,
    headers: {
      Authorization: null,
    },
  });
  constructor() {}

  async getDeckes() {
    const result = await this.client.request({
      data: { action: "deckNames", version: 6 },
    });

    const data: GetDecksNamesDTO = await result.data;

    const names = data.result;
    return names;
  }

  async checkHealth() {
    try {
      await this.client.request({
        method: "POST",
        data: {
          action: "requestPermission",
          version: 6,
        },
      });

      return {
        status: "UP",
      };
    } catch (error: any) {
      this.logger.error(`[ANKI] ${error?.message}`);
      return {
        status: "DOWN",
      };
    }
  }

  async addNote(deckName: string, card: CardDataDTO) {
    this.logger.debug(`[ANKIAPI] adding card to deck ${deckName}`);
    const options = {
      method: "POST",
      data: {
        action: "addNote",
        version: 6,
        params: {
          note: {
            deckName,
            modelName: "Basic",
            fields: { Front: card.cardFront, Back: card.cardBack },
            options: {
              allowDuplicate: false,
              duplicateScope: "deck",
              duplicateScopeOptions: {
                deckName: deckName,
                checkChildren: false,
                checkAllModels: false,
              },
            },
            tags: [],
            audio: [
              {
                path: card.audioPath,
                filename: card.audioName,
                fields: ["Front"],
              },
            ],
          },
        },
      },
    };

    const result = await this.client.request(options);

    const data: {
      result: number;
      error: unknown;
    } = result.data;

    return {
      result: data.result,
      error: data.error,
    };
  }

  async uploadFileToAnki({
    data,
    fileName,
  }: {
    fileName: string;
    data: string;
  }) {
    this.logger.debug(`[ANKIAPI] creating file ${fileName}`);

    const _result = await this.client.request({
      data: {
        action: "storeMediaFile",
        version: 6,
        params: {
          filename: fileName,
          data: data,
        },
      },
    });

    const res = _result.data;

    this.logger.debug(`res ${res}`);
    const finalPath = resolve(this.COLLECTION_MEDIAS_PATH, fileName);

    return {
      finalPath,
      name: fileName,
    };
  }
}
