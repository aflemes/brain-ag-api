import { Test, TestingModule } from '@nestjs/testing';
import { SafraService } from './safra.service';

describe('SafraService', () => {
  let service: SafraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SafraService],
    }).compile();

    service = module.get<SafraService>(SafraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
