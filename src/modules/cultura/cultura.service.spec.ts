import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CulturaService } from './cultura.service';
import { Cultura } from '../../entities/cultura.entity';
import { CreateCulturaDto } from './dto/create-cultura.dto';
import { UpdateCulturaDto } from './dto/update-cultura.dto';

describe('CulturaService', () => {
    let service: CulturaService;
    let repository: Repository<Cultura>;

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
                CulturaService,
                {
                    provide: getRepositoryToken(Cultura),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<CulturaService>(CulturaService);
        repository = module.get<Repository<Cultura>>(getRepositoryToken(Cultura));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new cultura', async () => {
            const createCulturaDto: CreateCulturaDto = {
                nome: 'Soja',
            };

            const expectedCultura = {
                id: 1,
                nome: 'Soja',
            };

            mockRepository.findOne.mockResolvedValue(null);
            mockRepository.create.mockReturnValue(expectedCultura);
            mockRepository.save.mockResolvedValue(expectedCultura);

            const result = await service.create(createCulturaDto);

            expect(result).toEqual(expectedCultura);
            expect(mockRepository.create).toHaveBeenCalledWith(createCulturaDto);
            expect(mockRepository.save).toHaveBeenCalled();
        });

        it('should throw ConflictException when cultura name already exists', async () => {
            const createCulturaDto: CreateCulturaDto = {
                nome: 'Soja',
            };

            mockRepository.findOne.mockResolvedValue({ id: 1, nome: 'Soja' });

            await expect(service.create(createCulturaDto))
                .rejects
                .toThrow(ConflictException);
        });
    });

    describe('findAll', () => {
        it('should return an array of culturas', async () => {
            const expectedCulturas = [
                { id: 1, nome: 'Soja' },
                { id: 2, nome: 'Milho' },
            ];

            mockRepository.find.mockResolvedValue(expectedCulturas);

            const result = await service.findAll();

            expect(result).toEqual(expectedCulturas);
            expect(mockRepository.find).toHaveBeenCalledWith({
                order: { nome: 'ASC' },
            });
        });
    });

    describe('findOne', () => {
        it('should return a cultura when it exists', async () => {
            const culturaId = 1;
            const expectedCultura = {
                id: culturaId,
                nome: 'Soja',
            };

            mockRepository.findOne.mockResolvedValue(expectedCultura);

            const result = await service.findOne(culturaId);

            expect(result).toEqual(expectedCultura);
            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { id: culturaId },
            });
        });

        it('should throw NotFoundException when cultura does not exist', async () => {
            const culturaId = 999;
            mockRepository.findOne.mockResolvedValue(null);

            await expect(service.findOne(culturaId))
                .rejects
                .toThrow(NotFoundException);
        });
    });
});
