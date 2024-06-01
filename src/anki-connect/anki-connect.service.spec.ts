import { Test, TestingModule } from '@nestjs/testing';
import { AnkiConnectService } from './anki-connect.service';

describe('AnkiConnectService', () => {
  let service: AnkiConnectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnkiConnectService],
    }).compile();

    service = module.get<AnkiConnectService>(AnkiConnectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
