import { Test, TestingModule } from '@nestjs/testing';
import { SafraController } from './safra.controller';

describe('SafraController', () => {
  let controller: SafraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SafraController],
    }).compile();

    controller = module.get<SafraController>(SafraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
