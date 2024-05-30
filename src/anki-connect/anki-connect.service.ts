import { Injectable, Logger } from '@nestjs/common';
import { GetDecksNamesDTO } from './types/decks';
import axios from 'axios';

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
}
