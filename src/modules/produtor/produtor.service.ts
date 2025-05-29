import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produtor } from '../../entities/produtor.entity';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { UpdateProdutorDto } from './dto/update-produtor.dto';
import { DocumentValidator } from '../../utils/document-validator';

@Injectable()
export class ProdutorService {
    constructor(@InjectRepository(Produtor)private produtorRepository: Repository<Produtor>) { }

    async create(createProdutorDto: CreateProdutorDto): Promise<Produtor> {
        const cleanDoc = createProdutorDto.documento.replace(/[^\d]/g, '');
        
        // Validar formato do documento
        if (!DocumentValidator.isValidDocument(cleanDoc)) {
            throw new BadRequestException('Documento (CPF/CNPJ) inválido');
        }

        // Verificar se o documento já existe
        const existingDocument = await this.produtorRepository.findOne({
            where: { documento: cleanDoc }
        });

        if (existingDocument) {
            throw new ConflictException('Documento (CPF/CNPJ) já cadastrado');
        }

        const produtor = this.produtorRepository.create({
            ...createProdutorDto,
            documento: cleanDoc // Salva apenas os números
        });
        return await this.produtorRepository.save(produtor);
    }

    async findAll(): Promise<Produtor[]> {
        return await this.produtorRepository.find({
            relations: ['propriedades'],
            order: { nome: 'ASC' }
        });
    }

    async findOne(id: number): Promise<Produtor> {
        const produtor = await this.produtorRepository.findOne({
            where: { id },
            relations: ['propriedades']
        });

        if (!produtor) {
            throw new NotFoundException(`Produtor com ID ${id} não encontrado`);
        }

        return produtor;
    }

    async update(id: number, updateProdutorDto: UpdateProdutorDto): Promise<Produtor> {
        const produtor = await this.findOne(id);

        if (updateProdutorDto.documento) {
            const cleanDoc = updateProdutorDto.documento.replace(/[^\d]/g, '');
            
            // Validar formato do documento
            if (!DocumentValidator.isValidDocument(cleanDoc)) {
                throw new BadRequestException('Documento (CPF/CNPJ) inválido');
            }

            // Verificar se documento já existe (exceto o próprio produtor)
            const existingDocument = await this.produtorRepository.findOne({
                where: { documento: cleanDoc }
            });

            if (existingDocument && existingDocument.id !== id) {
                throw new ConflictException('Documento já cadastrado');
            }

            updateProdutorDto.documento = cleanDoc; // Atualiza para usar apenas números
        }

        Object.assign(produtor, updateProdutorDto);
        return await this.produtorRepository.save(produtor);
    }

    async remove(id: number): Promise<void> {
        const produtor = await this.findOne(id);
        await this.produtorRepository.remove(produtor);
    }

    async findByCpf(documento: string): Promise<Produtor> {
        const produtor = await this.produtorRepository.findOne({
            where: { documento },
            relations: ['propriedades']
        });

        if (!produtor) {
            throw new NotFoundException(`Produtor com documento ${documento} não encontrado`);
        }

        return produtor;
    }
}
