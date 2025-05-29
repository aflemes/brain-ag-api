import { Test, TestingModule } from '@nestjs/testing';
import { CulturaPlantadaService } from './cultura-plantada.service';

describe('CulturaPlantadaService', () => {
  let service: CulturaPlantadaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CulturaPlantadaService],
    }).compile();

    service = module.get<CulturaPlantadaService>(CulturaPlantadaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
