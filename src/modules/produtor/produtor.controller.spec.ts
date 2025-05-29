import { Test, TestingModule } from '@nestjs/testing';
import { ProdutorController } from './produtor.controller';

describe('ProdutorController', () => {
  let controller: ProdutorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutorController],
    }).compile();

    controller = module.get<ProdutorController>(ProdutorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
