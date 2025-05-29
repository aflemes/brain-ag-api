import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { ProdutorService } from './produtor.service';
import { Produtor } from '../../entities/produtor.entity';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { UpdateProdutorDto } from './dto/update-produtor.dto';
import { DocumentValidator } from '../../utils/document-validator';

jest.mock('../../utils/document-validator');

describe('ProdutorService', () => {
    let service: ProdutorService;
    let repository: Repository<Produtor>;

    // Mock do repositório
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
                ProdutorService,
                {
                    provide: getRepositoryToken(Produtor),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<ProdutorService>(ProdutorService);
        repository = module.get<Repository<Produtor>>(getRepositoryToken(Produtor));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    });

    describe('create', () => {
        it('should successfully create a produtor with valid CPF', async () => {
            // Arrange
            const createProdutorDto: CreateProdutorDto = {
                nome: 'João Silva',
                documento: '123.456.789-09', // CPF válido
            };

            const expectedProdutor = {
                id: 1,
                nome: 'João Silva',
                documento: '12345678909',
            };

            (DocumentValidator.isValidDocument as jest.Mock).mockReturnValue(true);
            mockRepository.findOne.mockResolvedValue(null);
            mockRepository.create.mockReturnValue(expectedProdutor);
            mockRepository.save.mockResolvedValue(expectedProdutor);

            // Act
            const result = await service.create(createProdutorDto);

            // Assert
            expect(result).toEqual(expectedProdutor);
            expect(DocumentValidator.isValidDocument).toHaveBeenCalledWith('12345678909');
            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { documento: '12345678909' },
            });
            expect(mockRepository.create).toHaveBeenCalled();
            expect(mockRepository.save).toHaveBeenCalled();
        });

        it('should throw BadRequestException when document is invalid', async () => {
            // Arrange
            const createProdutorDto: CreateProdutorDto = {
                nome: 'João Silva',
                documento: '123.456.789-00', // CPF inválido
            };

            (DocumentValidator.isValidDocument as jest.Mock).mockReturnValue(false);

            // Act & Assert
            await expect(service.create(createProdutorDto)).rejects.toThrow(
                BadRequestException,
            );
        });

        it('should throw ConflictException when document already exists', async () => {
            // Arrange
            const createProdutorDto: CreateProdutorDto = {
                nome: 'João Silva',
                documento: '123.456.789-09', // CPF válido
            };

            (DocumentValidator.isValidDocument as jest.Mock).mockReturnValue(true);
            mockRepository.findOne.mockResolvedValue({ id: 1, ...createProdutorDto });

            // Act & Assert
            await expect(service.create(createProdutorDto)).rejects.toThrow(
                ConflictException,
            );
        });
    });

    describe('findAll', () => {
        it('should return an array of produtores', async () => {
            // Arrange
            const expectedProdutores = [
                {
                    id: 1,
                    nome: 'João Silva',
                    documento: '12345678909',
                    propriedades: [],
                },
                {
                    id: 2,
                    nome: 'Maria Santos',
                    documento: '98765432100',
                    propriedades: [],
                },
            ];

            mockRepository.find.mockResolvedValue(expectedProdutores);

            // Act
            const result = await service.findAll();

            // Assert
            expect(result).toEqual(expectedProdutores);
            expect(mockRepository.find).toHaveBeenCalledWith({
                relations: ['propriedades'],
                order: { nome: 'ASC' },
            });
        });
    });

    describe('findOne', () => {
        it('should return a produtor when it exists', async () => {
            // Arrange
            const produtorId = 1;
            const expectedProdutor = {
                id: produtorId,
                nome: 'João Silva',
                documento: '12345678909',
                propriedades: [],
            };

            mockRepository.findOne.mockResolvedValue(expectedProdutor);

            // Act
            const result = await service.findOne(produtorId);

            // Assert
            expect(result).toEqual(expectedProdutor);
            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { id: produtorId },
                relations: ['propriedades'],
            });
        });

        it('should throw NotFoundException when produtor does not exist', async () => {
            // Arrange
            const produtorId = 999;
            mockRepository.findOne.mockResolvedValue(null);

            // Act & Assert
            await expect(service.findOne(produtorId))
                .rejects
                .toThrow(NotFoundException);
            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { id: produtorId },
                relations: ['propriedades'],
            });
        });
    });

    describe('update', () => {
        it('should successfully update a produtor with valid data', async () => {
            // Arrange
            const produtorId = 1;
            const existingProdutor = {
                id: produtorId,
                nome: 'João Silva',
                documento: '12345678909',
                propriedades: [],
            };

            const updateProdutorDto: UpdateProdutorDto = {
                nome: 'João Silva Updated',
            };

            const expectedProdutor = {
                ...existingProdutor,
                ...updateProdutorDto,
            };

            mockRepository.findOne.mockResolvedValue(existingProdutor);
            mockRepository.save.mockResolvedValue(expectedProdutor);

            // Act
            const result = await service.update(produtorId, updateProdutorDto);

            // Assert
            expect(result).toEqual(expectedProdutor);
            expect(mockRepository.save).toHaveBeenCalledWith(expectedProdutor);
        });

        it('should successfully update a produtor document when valid', async () => {
            // Arrange
            const produtorId = 1;
            const existingProdutor = {
                id: produtorId,
                nome: 'João Silva',
                documento: '12345678909',
                propriedades: [],
            };

            const updateProdutorDto: UpdateProdutorDto = {
                documento: '987.654.321-09',
            };

            (DocumentValidator.isValidDocument as jest.Mock).mockReturnValue(true);

            mockRepository.findOne
                .mockResolvedValueOnce(existingProdutor) // Para o findOne inicial
                .mockResolvedValueOnce(null); // Para a verificação de documento duplicado

            const expectedProdutor = {
                ...existingProdutor,
                documento: '98765432109',
            };

            mockRepository.save.mockResolvedValue(expectedProdutor);

            // Act
            const result = await service.update(produtorId, updateProdutorDto);

            // Assert
            expect(result).toEqual(expectedProdutor);
            expect(DocumentValidator.isValidDocument).toHaveBeenCalledWith('98765432109');
            expect(mockRepository.save).toHaveBeenCalledWith(expectedProdutor);
        });

        it('should throw BadRequestException when updating with invalid document', async () => {
            // Arrange
            const produtorId = 1;
            const existingProdutor = {
                id: produtorId,
                nome: 'João Silva',
                documento: '12345678909',
                propriedades: [],
            };

            const updateProdutorDto: UpdateProdutorDto = {
                documento: '123.456.789-00', // CPF inválido
            };

            mockRepository.findOne.mockResolvedValue(existingProdutor);
            (DocumentValidator.isValidDocument as jest.Mock).mockReturnValue(false);

            // Act & Assert
            await expect(service.update(produtorId, updateProdutorDto))
                .rejects
                .toThrow(BadRequestException);
        });

        it('should throw ConflictException when updating with existing document', async () => {
            // Arrange
            const produtorId = 1;
            const existingProdutor = {
                id: produtorId,
                nome: 'João Silva',
                documento: '12345678909',
                propriedades: [],
            };

            const anotherProdutor = {
                id: 2,
                nome: 'Maria Santos',
                documento: '98765432109',
                propriedades: [],
            };

            const updateProdutorDto: UpdateProdutorDto = {
                documento: '987.654.321-09',
            };

            (DocumentValidator.isValidDocument as jest.Mock).mockReturnValue(true);

            mockRepository.findOne
                .mockResolvedValueOnce(existingProdutor) // Para o findOne inicial
                .mockResolvedValueOnce(anotherProdutor); // Para a verificação de documento duplicado

            // Act & Assert
            await expect(service.update(produtorId, updateProdutorDto))
                .rejects
                .toThrow(ConflictException);
        });

        it('should throw NotFoundException when updating non-existing produtor', async () => {
            // Arrange
            const produtorId = 999;
            mockRepository.findOne.mockResolvedValue(null);

            // Act & Assert
            await expect(service.update(produtorId, { nome: 'Test' }))
                .rejects
                .toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should successfully remove a produtor', async () => {
            // Arrange
            const produtorId = 1;
            const existingProdutor = {
                id: produtorId,
                nome: 'João Silva',
                documento: '12345678909',
                propriedades: [],
            };

            mockRepository.findOne.mockResolvedValue(existingProdutor);
            mockRepository.remove.mockResolvedValue(existingProdutor);

            // Act
            await service.remove(produtorId);

            // Assert
            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { id: produtorId },
                relations: ['propriedades'],
            });
            expect(mockRepository.remove).toHaveBeenCalledWith(existingProdutor);
        });

        it('should throw NotFoundException when trying to remove non-existing produtor', async () => {
            // Arrange
            const produtorId = 999;
            mockRepository.findOne.mockResolvedValue(null);

            // Act & Assert
            await expect(service.remove(produtorId))
                .rejects
                .toThrow(NotFoundException);
        });
    });
});
