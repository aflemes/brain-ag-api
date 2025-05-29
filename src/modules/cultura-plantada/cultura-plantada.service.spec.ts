import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CulturaPlantadaService } from './cultura-plantada.service';
import { PropriedadeService } from '../propriedade/propriedade.service';
import { SafraService } from '../safra/safra.service';
import { CulturaService } from '../cultura/cultura.service';
import { CulturaPlantada } from '../../entities/cultura_plantada.entity';

describe('CulturaPlantadaService', () => {
    let service: CulturaPlantadaService;
    let repository: Repository<CulturaPlantada>;

    const mockRepository = {
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
        find: jest.fn(),
        remove: jest.fn(),
    };

    const mockPropriedadeService = {
        findOne: jest.fn()
    };

    const mockSafraService = {
        findOne: jest.fn()
    };

    const mockCulturaService = {
        findOne: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CulturaPlantadaService,
                {
                    provide: getRepositoryToken(CulturaPlantada),
                    useValue: mockRepository,
                },
                {
                    provide: PropriedadeService,
                    useValue: mockPropriedadeService,
                },
                {
                    provide: SafraService,
                    useValue: mockSafraService,
                },
                {
                    provide: CulturaService,
                    useValue: mockCulturaService,
                }
            ],
        }).compile();

        service = module.get<CulturaPlantadaService>(CulturaPlantadaService);
        repository = module.get<Repository<CulturaPlantada>>(getRepositoryToken(CulturaPlantada));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    });

    describe('create', () => {
        it('should successfully create a cultura plantada', async () => {
            // Arrange
            const createCulturaPlantadaDto = {
                propriedade_id: 1,
                safra_id: 1,
                cultura_id: 1
            };

            const expectedCulturaPlantada = {
                id: 1,
                ...createCulturaPlantadaDto,
                propriedade: { id: 1, nome: 'Fazenda Teste' },
                safra: { id: 1, nome: 'Safra 2023' },
                cultura: { id: 1, nome: 'Soja' }
            };

            mockPropriedadeService.findOne.mockResolvedValue({ id: 1 });
            mockSafraService.findOne.mockResolvedValue({ id: 1 });
            mockCulturaService.findOne.mockResolvedValue({ id: 1 });
            mockRepository.findOne.mockResolvedValue(null);
            mockRepository.create.mockReturnValue(createCulturaPlantadaDto);
            mockRepository.save.mockResolvedValue(expectedCulturaPlantada);

            // Act
            const result = await service.create(createCulturaPlantadaDto);

            // Assert
            expect(result).toEqual(expectedCulturaPlantada);
            expect(mockPropriedadeService.findOne).toHaveBeenCalledWith(createCulturaPlantadaDto.propriedade_id);
            expect(mockSafraService.findOne).toHaveBeenCalledWith(createCulturaPlantadaDto.safra_id);
            expect(mockCulturaService.findOne).toHaveBeenCalledWith(createCulturaPlantadaDto.cultura_id);
            expect(mockRepository.create).toHaveBeenCalledWith(createCulturaPlantadaDto);
            expect(mockRepository.save).toHaveBeenCalled();
        });

        it('should throw ConflictException when cultura already planted in propriedade for safra', async () => {
            // Arrange
            const createCulturaPlantadaDto = {
                propriedade_id: 1,
                safra_id: 1,
                cultura_id: 1
            };

            mockPropriedadeService.findOne.mockResolvedValue({ id: 1 });
            mockSafraService.findOne.mockResolvedValue({ id: 1 });
            mockCulturaService.findOne.mockResolvedValue({ id: 1 });
            mockRepository.findOne.mockResolvedValue({ id: 2, ...createCulturaPlantadaDto });

            // Act & Assert
            await expect(service.create(createCulturaPlantadaDto))
                .rejects
                .toThrow(ConflictException);
        });
    });

    describe('findAll', () => {
        it('should return an array of culturas plantadas', async () => {
            // Arrange
            const expectedCulturasPlantadas = [
                {
                    id: 1,
                    propriedade_id: 1,
                    safra_id: 1,
                    cultura_id: 1,
                    propriedade: { id: 1, nome: 'Fazenda 1' },
                    safra: { id: 1, nome: 'Safra 2023' },
                    cultura: { id: 1, nome: 'Soja' }
                },
                {
                    id: 2,
                    propriedade_id: 2,
                    safra_id: 1,
                    cultura_id: 2,
                    propriedade: { id: 2, nome: 'Fazenda 2' },
                    safra: { id: 1, nome: 'Safra 2023' },
                    cultura: { id: 2, nome: 'Milho' }
                }
            ];

            mockRepository.find.mockResolvedValue(expectedCulturasPlantadas);

            // Act
            const result = await service.findAll();

            // Assert
            expect(result).toEqual(expectedCulturasPlantadas);
            expect(mockRepository.find).toHaveBeenCalledWith({
                relations: ['propriedade', 'cultura', 'safra'],
                order: {
                    safra_id: 'DESC',
                    propriedade_id: 'ASC',
                    cultura_id: 'ASC'
                }
            });
        });
    });

    describe('findOne', () => {
        it('should return a cultura plantada when it exists', async () => {
            // Arrange
            const culturaPlantadaId = 1;
            const expectedCulturaPlantada = {
                id: culturaPlantadaId,
                propriedade_id: 1,
                safra_id: 1,
                cultura_id: 1,
                propriedade: { id: 1, nome: 'Fazenda Teste' },
                safra: { id: 1, nome: 'Safra 2023' },
                cultura: { id: 1, nome: 'Soja' }
            };

            mockRepository.findOne.mockResolvedValue(expectedCulturaPlantada);

            // Act
            const result = await service.findOne(culturaPlantadaId);

            // Assert
            expect(result).toEqual(expectedCulturaPlantada);
            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { id: culturaPlantadaId },
                relations: ['propriedade', 'cultura', 'safra']
            });
        });

        it('should throw NotFoundException when cultura plantada does not exist', async () => {
            // Arrange
            const culturaPlantadaId = 999;
            mockRepository.findOne.mockResolvedValue(null);

            // Act & Assert
            await expect(service.findOne(culturaPlantadaId))
                .rejects
                .toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should successfully remove a cultura plantada', async () => {
            // Arrange
            const culturaPlantadaId = 1;
            const culturaPlantada = {
                id: culturaPlantadaId,
                propriedade_id: 1,
                safra_id: 1,
                cultura_id: 1
            };

            mockRepository.findOne.mockResolvedValue(culturaPlantada);
            mockRepository.remove.mockResolvedValue(culturaPlantada);

            // Act
            await service.remove(culturaPlantadaId);

            // Assert
            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { id: culturaPlantadaId },
                relations: ['propriedade', 'cultura', 'safra']
            });
            expect(mockRepository.remove).toHaveBeenCalledWith(culturaPlantada);
        });

        it('should throw NotFoundException when trying to remove non-existent cultura plantada', async () => {
            // Arrange
            const culturaPlantadaId = 999;
            mockRepository.findOne.mockResolvedValue(null);

            // Act & Assert
            await expect(service.remove(culturaPlantadaId))
                .rejects
                .toThrow(NotFoundException);
        });
    });
});
