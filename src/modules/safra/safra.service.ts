import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Safra } from '../../entities/safra.entity';
import { CreateSafraDto } from './dto/create-safra.dto';
import { UpdateSafraDto } from './dto/update-safra.dto';

@Injectable()
export class SafraService {
    constructor(
        @InjectRepository(Safra)
        private safraRepository: Repository<Safra>,
    ) {}

    private async validateNomeDuplicado(nome: string, id?: number) {
        const existingSafra = await this.safraRepository.findOne({
            where: { nome }
        });

        if (existingSafra && existingSafra.id !== id) {
            throw new ConflictException(`Já existe uma safra com o nome "${nome}"`);
        }
    }

    async findAll(): Promise<Safra[]> {
        return await this.safraRepository.find({
            relations: ['culturasPlantadas'],
            order: { nome: 'ASC' }
        });
    }

    async findOne(id: number): Promise<Safra> {
        const safra = await this.safraRepository.findOne({
            where: { id }
        });
        
        if (!safra) {
            throw new NotFoundException(`Safra com ID ${id} não encontrada`);
        }
        
        return safra;
    }

    async findOneWithCulturas(id: number): Promise<Safra> {
        const safra = await this.safraRepository.findOne({
            where: { id },
            relations: ['culturasPlantadas']
        });
        
        if (!safra) {
            throw new NotFoundException(`Safra com ID ${id} não encontrada`);
        }
        
        return safra;
    }

    async create(createSafraDto: CreateSafraDto): Promise<Safra> {
        await this.validateNomeDuplicado(createSafraDto.nome);
        
        const safra = this.safraRepository.create(createSafraDto);
        return await this.safraRepository.save(safra);
    }

    async update(id: number, updateSafraDto: UpdateSafraDto): Promise<Safra> {
        const safra = await this.findOne(id);
        
        if (updateSafraDto.nome) {
            await this.validateNomeDuplicado(updateSafraDto.nome, id);
        }

        Object.assign(safra, updateSafraDto);
        return await this.safraRepository.save(safra);
    }

    async remove(id: number): Promise<void> {
        const safra = await this.findOne(id);
        await this.safraRepository.remove(safra);
    }
}