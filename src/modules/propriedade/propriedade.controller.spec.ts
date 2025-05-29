import { Test, TestingModule } from '@nestjs/testing';
import { PropriedadeController } from './propriedade.controller';

describe('PropriedadeController', () => {
  let controller: PropriedadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropriedadeController],
    }).compile();

    controller = module.get<PropriedadeController>(PropriedadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
