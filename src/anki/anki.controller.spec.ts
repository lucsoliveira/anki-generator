import { Test, TestingModule } from '@nestjs/testing';
import { AnkiController } from './anki.controller';

describe('AnkiController', () => {
  let controller: AnkiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnkiController],
    }).compile();

    controller = module.get<AnkiController>(AnkiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
