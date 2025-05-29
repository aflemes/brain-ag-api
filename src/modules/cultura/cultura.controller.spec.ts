import { Test, TestingModule } from '@nestjs/testing';
import { CulturaController } from './cultura.controller';

describe('CulturaController', () => {
  let controller: CulturaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CulturaController],
    }).compile();

    controller = module.get<CulturaController>(CulturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
