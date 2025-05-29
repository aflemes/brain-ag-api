import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PropriedadeService } from './propriedade.service';
import { ProdutorService } from '../produtor/produtor.service';
import { Propriedade } from '../../entities/propriedade.entity';

describe('PropriedadeService', () => {
    let service: PropriedadeService;
    let repository: Repository<Propriedade>;

    const mockRepository = {
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
        find: jest.fn(),
        remove: jest.fn(),
    };

    const mockProdutorService = {
        findOne: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PropriedadeService,
                {
                    provide: getRepositoryToken(Propriedade),
                    useValue: mockRepository,
                },
                {
                    provide: ProdutorService,
                    useValue: mockProdutorService,
                }
            ],
        }).compile();

        service = module.get<PropriedadeService>(PropriedadeService);
        repository = module.get<Repository<Propriedade>>(getRepositoryToken(Propriedade));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    });

    describe('create', () => {
        it('should successfully create a property', async () => {
            // Arrange
            const createPropriedadeDto = {
                produtor_id: 1,
                nome: 'Fazenda Teste',
                cidade: 'Cidade Teste',
                estado: 'ES',
                area_total: 1000,
                area_agricultavel: 700,
                area_vegetacao: 300
            };

            mockProdutorService.findOne.mockResolvedValue({ id: 1 });
            mockRepository.findOne.mockResolvedValue(null);
            mockRepository.create.mockReturnValue(createPropriedadeDto);
            mockRepository.save.mockResolvedValue({ id: 1, ...createPropriedadeDto });

            // Act
            const result = await service.create(createPropriedadeDto);

            // Assert
            expect(result).toEqual({ id: 1, ...createPropriedadeDto });
            expect(mockProdutorService.findOne).toHaveBeenCalledWith(createPropriedadeDto.produtor_id);
            expect(mockRepository.create).toHaveBeenCalledWith(createPropriedadeDto);
            expect(mockRepository.save).toHaveBeenCalled();
        });

        it('should throw ConflictException when property name already exists in same city', async () => {
            // Arrange
            const createPropriedadeDto = {
                produtor_id: 1,
                nome: 'Fazenda Teste',
                cidade: 'Cidade Teste',
                estado: 'ES',
                area_total: 1000,
                area_agricultavel: 700,
                area_vegetacao: 300
            };

            mockRepository.findOne.mockResolvedValue({ id: 2, ...createPropriedadeDto });

            // Act & Assert
            await expect(service.create(createPropriedadeDto)).rejects.toThrow(ConflictException);
        });

        it('should throw BadRequestException when areas are invalid', async () => {
            // Arrange
            const createPropriedadeDto = {
                produtor_id: 1,
                nome: 'Fazenda Teste',
                cidade: 'Cidade Teste',
                estado: 'ES',
                area_total: 1000,
                area_agricultavel: 700,
                area_vegetacao: 400 // Total > area_total
            };

            mockProdutorService.findOne.mockResolvedValue({ id: 1 });
            mockRepository.findOne.mockResolvedValue(null);

            // Act & Assert
            await expect(service.create(createPropriedadeDto)).rejects.toThrow();
        });
    });

    describe('findAll', () => {
        it('should return an array of properties', async () => {
            // Arrange
            const expectedProperties = [
                {
                    id: 1,
                    nome: 'Fazenda 1',
                    cidade: 'Cidade 1',
                    estado: 'ES',
                    area_total: 1000,
                    area_agricultavel: 700,
                    area_vegetacao: 300,
                    produtor_id: 1
                },
                {
                    id: 2,
                    nome: 'Fazenda 2',
                    cidade: 'Cidade 2',
                    estado: 'MT',
                    area_total: 2000,
                    area_agricultavel: 1500,
                    area_vegetacao: 500,
                    produtor_id: 2
                }
            ];

            mockRepository.find.mockResolvedValue(expectedProperties);

            // Act
            const result = await service.findAll();

            // Assert
            expect(result).toEqual(expectedProperties);
            expect(mockRepository.find).toHaveBeenCalledWith({
                relations: ['produtor', 'culturasPlantadas'],
                order: { nome: 'ASC' }
            });
        });
    });

    describe('findOne', () => {
        it('should return a property when it exists', async () => {
            // Arrange
            const propertyId = 1;
            const expectedProperty = {
                id: propertyId,
                nome: 'Fazenda Teste',
                cidade: 'Cidade Teste',
                estado: 'ES',
                area_total: 1000,
                area_agricultavel: 700,
                area_vegetacao: 300,
                produtor_id: 1
            };

            mockRepository.findOne.mockResolvedValue(expectedProperty);

            // Act
            const result = await service.findOne(propertyId);

            // Assert
            expect(result).toEqual(expectedProperty);
            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { id: propertyId },
                relations: ['produtor', 'culturasPlantadas']
            });
        });

        it('should throw NotFoundException when property does not exist', async () => {
            // Arrange
            const propertyId = 999;
            mockRepository.findOne.mockResolvedValue(null);

            // Act & Assert
            await expect(service.findOne(propertyId)).rejects.toThrow(NotFoundException);
        });
    });
});
