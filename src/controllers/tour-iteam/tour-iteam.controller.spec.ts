import { Test, TestingModule } from '@nestjs/testing';
import { TourIteamController } from './tour-iteam.controller';

describe('TourIteamController', () => {
  let controller: TourIteamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourIteamController],
    }).compile();

    controller = module.get<TourIteamController>(TourIteamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
