import { Test, TestingModule } from '@nestjs/testing';
import { CulturaPlantadaController } from './cultura-plantada.controller';

describe('CulturaPlantadaController', () => {
  let controller: CulturaPlantadaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CulturaPlantadaController],
    }).compile();

    controller = module.get<CulturaPlantadaController>(CulturaPlantadaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
