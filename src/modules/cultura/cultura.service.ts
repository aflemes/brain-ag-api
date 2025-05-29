import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cultura } from '../../entities/cultura.entity';
import { CreateCulturaDto } from './dto/create-cultura.dto';
import { UpdateCulturaDto } from './dto/update-cultura.dto';

@Injectable()
export class CulturaService {
    constructor(
        @InjectRepository(Cultura)
        private culturaRepository: Repository<Cultura>
    ) {}

    private async validateNomeDuplicado(nome: string, id?: number) {
        const existingCultura = await this.culturaRepository.findOne({
            where: { nome }
        });

        if (existingCultura && existingCultura.id !== id) {
            throw new ConflictException(`Já existe uma cultura com o nome "${nome}"`);
        }
    }

    async findAll(): Promise<Cultura[]> {
        return await this.culturaRepository.find({
            order: { nome: 'ASC' }
        });
    }

    async findOne(id: number): Promise<Cultura> {
        const cultura = await this.culturaRepository.findOne({
            where: { id }
        });
        
        if (!cultura) {
            throw new NotFoundException(`Cultura com ID ${id} não encontrada`);
        }
        
        return cultura;
    }

    async create(createCulturaDto: CreateCulturaDto): Promise<Cultura> {
        await this.validateNomeDuplicado(createCulturaDto.nome);
        
        const cultura = this.culturaRepository.create(createCulturaDto);
        return await this.culturaRepository.save(cultura);
    }

    async update(id: number, updateCulturaDto: UpdateCulturaDto): Promise<Cultura> {
        const cultura = await this.findOne(id);
        
        if (updateCulturaDto.nome) {
            await this.validateNomeDuplicado(updateCulturaDto.nome, id);
        }

        Object.assign(cultura, updateCulturaDto);
        return await this.culturaRepository.save(cultura);
    }

    async remove(id: number): Promise<void> {
        const cultura = await this.findOne(id);
        await this.culturaRepository.remove(cultura);
    }
}