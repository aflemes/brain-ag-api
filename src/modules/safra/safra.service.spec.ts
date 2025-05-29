import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { SafraService } from './safra.service';
import { Safra } from '../../entities/safra.entity';
import { CreateSafraDto } from './dto/create-safra.dto';

describe('SafraService', () => {
    let service: SafraService;
    let repository: Repository<Safra>;

    const mockRepository = {
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
        find: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SafraService,
                {
                    provide: getRepositoryToken(Safra),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<SafraService>(SafraService);
        repository = module.get<Repository<Safra>>(getRepositoryToken(Safra));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new safra', async () => {
            const createSafraDto: CreateSafraDto = {
                nome: 'Safra 2024',
            };

            const expectedSafra = {
                id: 1,
                nome: 'Safra 2024',
                culturasPlantadas: [],
            };

            mockRepository.findOne.mockResolvedValue(null);
            mockRepository.create.mockReturnValue(expectedSafra);
            mockRepository.save.mockResolvedValue(expectedSafra);

            const result = await service.create(createSafraDto);

            expect(result).toEqual(expectedSafra);
            expect(mockRepository.create).toHaveBeenCalledWith(createSafraDto);
            expect(mockRepository.save).toHaveBeenCalled();
        });

        it('should throw ConflictException when safra name already exists', async () => {
            const createSafraDto: CreateSafraDto = {
                nome: 'Safra 2024',
            };

            mockRepository.findOne.mockResolvedValue({ id: 1, nome: 'Safra 2024' });

            await expect(service.create(createSafraDto))
                .rejects
                .toThrow(ConflictException);
        });
    });

    describe('findAll', () => {
        it('should return an array of safras', async () => {
            const expectedSafras = [
                {
                    id: 1,
                    nome: 'Safra 2024',
                    culturasPlantadas: [],
                },
                {
                    id: 2,
                    nome: 'Safra 2025',
                    culturasPlantadas: [],
                },
            ];

            mockRepository.find.mockResolvedValue(expectedSafras);

            const result = await service.findAll();

            expect(result).toEqual(expectedSafras);
            expect(mockRepository.find).toHaveBeenCalledWith({
                relations: ['culturasPlantadas'],
                order: { nome: 'ASC' },
            });
        });
    });

    describe('findOne', () => {
        it('should return a safra when it exists', async () => {
            const safraId = 1;
            const expectedSafra = {
                id: safraId,
                nome: 'Safra 2024',
            };

            mockRepository.findOne.mockResolvedValue(expectedSafra);

            const result = await service.findOne(safraId);

            expect(result).toEqual(expectedSafra);
            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { id: safraId },
            });
        });

        it('should throw NotFoundException when safra does not exist', async () => {
            const safraId = 999;
            mockRepository.findOne.mockResolvedValue(null);

            await expect(service.findOne(safraId))
                .rejects
                .toThrow(NotFoundException);
        });
    });

    describe('findOneWithCulturas', () => {
        it('should return a safra with culturas when it exists', async () => {
            const safraId = 1;
            const expectedSafra = {
                id: safraId,
                nome: 'Safra 2024',
                culturasPlantadas: [],
            };

            mockRepository.findOne.mockResolvedValue(expectedSafra);

            const result = await service.findOneWithCulturas(safraId);

            expect(result).toEqual(expectedSafra);
            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { id: safraId },
                relations: ['culturasPlantadas'],
            });
        });

        it('should throw NotFoundException when safra does not exist', async () => {
            const safraId = 999;
            mockRepository.findOne.mockResolvedValue(null);

            await expect(service.findOneWithCulturas(safraId))
                .rejects
                .toThrow(NotFoundException);
        });
    });
});
