import { Injectable, Logger } from '@nestjs/common';
import { GetDecksNamesDTO } from './types/decks';
import axios from 'axios';
import { CardDataDTO } from '../anki/dto';
import { error } from 'console';

@Injectable()
export class AnkiConnectService {
  private readonly logger = new Logger(AnkiConnectService.name);
  constructor() {}

  async getDeckes() {
    const result = await axios.request({
      baseURL: 'http://localhost:8765',
      method: 'POST',
      data: { action: 'deckNames', version: 6 },
    });

    const data: GetDecksNamesDTO = await result.data;

    return data;
  }

  async checkHealth() {
    try {
      await this.getDeckes();
      return {
        status: 'UP',
      };
    } catch (error) {
      this.logger.error(error.message);
      return {
        status: 'DOWN',
      };
    }
  }

  // TODO: finalizar
  async addNote(deckName: string, card: CardDataDTO) {
    const options = {
      method: 'POST',
      url: 'http://localhost:8765/',
      data: {
        action: 'addNote',
        version: 6,
        params: {
          note: {
            deckName,
            // TODO: receber e criar model
            modelName: 'Basic',
            fields: { Front: card.cardFront, Back: card.cardBack },
            options: {
              allowDuplicate: false,
              duplicateScope: 'deck',
              duplicateScopeOptions: {
                deckName: 'Default',
                checkChildren: false,
                checkAllModels: false,
              },
            },
            tags: [],
            audio: [
              {
                path: card.audioPath,
                filename: card.audioName,
                fields: ['Front'],
              },
            ],
          },
        },
      },
    };

    const result = await axios.request(options);

    const data: {
      result: number;
      error: any;
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

    const _result = await axios.request({
      baseURL: 'http://localhost:8765/',
      data: {
        action: 'storeMediaFile',
        version: 6,
        params: {
          filename: fileName,
          data: data,
        },
      },
    });

    const res = _result.data;

    this.logger.debug(`res ${res}`);
    const finalPath =
      '/home/lucas/.var/app/net.ankiweb.Anki/data/Anki2/Usuário 1/collection.media/' +
      fileName;

    return {
      finalPath,
      name: fileName,
    };
  }
}
