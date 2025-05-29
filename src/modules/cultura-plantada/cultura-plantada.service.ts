import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CulturaPlantada } from '../../entities/cultura_plantada.entity';
import { CreateCulturaPlantadaDto } from './dto/create-cultura-plantada.dto';
import { UpdateCulturaPlantadaDto } from './dto/update-cultura-plantada.dto';
import { PropriedadeService } from '../propriedade/propriedade.service';
import { SafraService } from '../safra/safra.service';
import { CulturaService } from '../cultura/cultura.service';

@Injectable()
export class CulturaPlantadaService {
    constructor(
        @InjectRepository(CulturaPlantada)
        private culturaPlantadaRepository: Repository<CulturaPlantada>,
        private propriedadeService: PropriedadeService,
        private safraService: SafraService,
        private culturaService: CulturaService
    ) {}

    private async validateEntities(propriedadeId: number, safraId: number, culturaId: number) {
        // Valida se a propriedade existe
        await this.propriedadeService.findOne(propriedadeId);
        
        // Valida se a safra existe
        await this.safraService.findOne(safraId);
        
        // Valida se a cultura existe
        await this.culturaService.findOne(culturaId);
    }

    private async validateDuplicatePlanting(propriedadeId: number, safraId: number, culturaId: number, id?: number) {
        const existingPlanting = await this.culturaPlantadaRepository.findOne({
            where: {
                propriedade_id: propriedadeId,
                safra_id: safraId,
                cultura_id: culturaId
            }
        });

        if (existingPlanting && existingPlanting.id !== id) {
            throw new ConflictException('Esta cultura já está registrada para esta propriedade nesta safra');
        }
    }

    async create(createCulturaPlantadaDto: CreateCulturaPlantadaDto): Promise<CulturaPlantada> {
        const { propriedade_id, safra_id, cultura_id } = createCulturaPlantadaDto;

        // Valida se as entidades relacionadas existem
        await this.validateEntities(propriedade_id, safra_id, cultura_id);
        
        // Valida se já existe o mesmo plantio
        await this.validateDuplicatePlanting(propriedade_id, safra_id, cultura_id);
        
        const culturaPlantada = this.culturaPlantadaRepository.create(createCulturaPlantadaDto);
        return await this.culturaPlantadaRepository.save(culturaPlantada);
    }

    async findAll(): Promise<CulturaPlantada[]> {
        return await this.culturaPlantadaRepository.find({
            relations: ['propriedade', 'cultura', 'safra'],
            order: {
                safra_id: 'DESC',
                propriedade_id: 'ASC',
                cultura_id: 'ASC'
            }
        });
    }

    async findOne(id: number): Promise<CulturaPlantada> {
        const culturaPlantada = await this.culturaPlantadaRepository.findOne({
            where: { id },
            relations: ['propriedade', 'cultura', 'safra']
        });
        
        if (!culturaPlantada) {
            throw new NotFoundException(`Cultura Plantada com ID ${id} não encontrada`);
        }
        
        return culturaPlantada;
    }

    async update(id: number, updateCulturaPlantadaDto: UpdateCulturaPlantadaDto): Promise<CulturaPlantada> {
        const culturaPlantada = await this.findOne(id);
        
        // Se algum dos campos de relacionamento estiver sendo atualizado, valida a existência
        if (updateCulturaPlantadaDto.propriedade_id || updateCulturaPlantadaDto.safra_id || updateCulturaPlantadaDto.cultura_id) {
            await this.validateEntities(
                updateCulturaPlantadaDto.propriedade_id ?? culturaPlantada.propriedade_id,
                updateCulturaPlantadaDto.safra_id ?? culturaPlantada.safra_id,
                updateCulturaPlantadaDto.cultura_id ?? culturaPlantada.cultura_id
            );
        }

        // Se algum dos campos chave estiver sendo atualizado, valida duplicação
        if (updateCulturaPlantadaDto.propriedade_id || updateCulturaPlantadaDto.safra_id || updateCulturaPlantadaDto.cultura_id) {
            await this.validateDuplicatePlanting(
                updateCulturaPlantadaDto.propriedade_id ?? culturaPlantada.propriedade_id,
                updateCulturaPlantadaDto.safra_id ?? culturaPlantada.safra_id,
                updateCulturaPlantadaDto.cultura_id ?? culturaPlantada.cultura_id,
                id
            );
        }

        Object.assign(culturaPlantada, updateCulturaPlantadaDto);
        return await this.culturaPlantadaRepository.save(culturaPlantada);
    }

    async remove(id: number): Promise<void> {
        const culturaPlantada = await this.findOne(id);
        await this.culturaPlantadaRepository.remove(culturaPlantada);
    }
}
