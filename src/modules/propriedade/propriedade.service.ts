import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propriedade } from '../../entities/propriedade.entity';
import { CreatePropriedadeDto } from './dto/create-propriedade.dto';
import { UpdatePropriedadeDto } from './dto/update-propriedade.dto';
import { InvalidAreaException } from '../../utils/area-validator';
import { ProdutorService } from '../produtor/produtor.service';

@Injectable()
export class PropriedadeService {
    constructor(
        @InjectRepository(Propriedade)
        private propriedadeRepository: Repository<Propriedade>,
        private produtorService: ProdutorService
    ) {}

    private validateAreas(areaTotal: number, areaAgricultavel: number, areaVegetacao: number) {
        if (areaAgricultavel + areaVegetacao > areaTotal) {
            throw new InvalidAreaException();
        }
    }

    private async validateProdutor(produtorId: number) {
        await this.produtorService.findOne(produtorId); // Isso já lança NotFoundException se não existir
    }

    private async validatePropriedadeDuplicada(nome: string, cidade: string, estado: string, id?: number) {
        const propriedadeExistente = await this.propriedadeRepository.findOne({
            where: { nome, cidade, estado }
        });

        if (propriedadeExistente && propriedadeExistente.id !== id) {
            throw new ConflictException(
                `Já existe uma propriedade com o nome "${nome}" na cidade de ${cidade}/${estado}`
            );
        }
    }

    async create(createPropriedadeDto: CreatePropriedadeDto): Promise<Propriedade> {
        const { area_total, area_agricultavel, area_vegetacao, produtor_id, nome, cidade, estado } = createPropriedadeDto;
        
        // Valida se já existe uma propriedade com mesmo nome na mesma cidade
        await this.validatePropriedadeDuplicada(nome, cidade, estado);
        
        // Valida se o produtor existe
        await this.validateProdutor(produtor_id);
        
        // Valida as áreas
        this.validateAreas(area_total, area_agricultavel, area_vegetacao);
        
        const propriedade = this.propriedadeRepository.create(createPropriedadeDto);
        return await this.propriedadeRepository.save(propriedade);
    }

    async findAll(): Promise<Propriedade[]> {
        return await this.propriedadeRepository.find({
            relations: ['produtor', 'culturasPlantadas'],
            order: { nome: 'ASC' }
        });
    }

    async findOne(id: number): Promise<Propriedade> {
        const propriedade = await this.propriedadeRepository.findOne({
            where: { id },
            relations: ['produtor', 'culturasPlantadas']
        });
        if (!propriedade) {
            throw new NotFoundException(`Propriedade com ID ${id} não encontrada`);
        }
        return propriedade;
    }

    async update(id: number, updatePropriedadeDto: UpdatePropriedadeDto): Promise<Propriedade> {
        const propriedade = await this.findOne(id);
        
        // Se estiver atualizando o nome, cidade ou estado, valida duplicação
        if (updatePropriedadeDto.nome || updatePropriedadeDto.cidade || updatePropriedadeDto.estado) {
            await this.validatePropriedadeDuplicada(
                updatePropriedadeDto.nome ?? propriedade.nome,
                updatePropriedadeDto.cidade ?? propriedade.cidade,
                updatePropriedadeDto.estado ?? propriedade.estado,
                id
            );
        }
        
        // Se estiver atualizando o produtor, valida se ele existe
        if (updatePropriedadeDto.produtor_id) {
            await this.validateProdutor(updatePropriedadeDto.produtor_id);
        }

        // Calcula as áreas finais considerando os valores existentes e as atualizações
        const areaTotal = updatePropriedadeDto.area_total ?? propriedade.area_total;
        const areaAgricultavel = updatePropriedadeDto.area_agricultavel ?? propriedade.area_agricultavel;
        const areaVegetacao = updatePropriedadeDto.area_vegetacao ?? propriedade.area_vegetacao;

        this.validateAreas(areaTotal, areaAgricultavel, areaVegetacao);

        Object.assign(propriedade, updatePropriedadeDto);
        return await this.propriedadeRepository.save(propriedade);
    }

    async remove(id: number): Promise<void> {
        const propriedade = await this.findOne(id);
        await this.propriedadeRepository.remove(propriedade);
    }
}
