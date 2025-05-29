import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CulturaPlantadaService } from './cultura-plantada.service';
import { CreateCulturaPlantadaDto } from './dto/create-cultura-plantada.dto';
import { UpdateCulturaPlantadaDto } from './dto/update-cultura-plantada.dto';
import { CulturaPlantada } from '../../entities/cultura_plantada.entity';

@ApiTags('culturas-plantadas')
@Controller('culturas-plantadas')
export class CulturaPlantadaController {
    constructor(private readonly culturaPlantadaService: CulturaPlantadaService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Registrar novo plantio de cultura' })
    @ApiResponse({
        status: 201,
        description: 'Plantio registrado com sucesso',
        type: CulturaPlantada
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 404, description: 'Propriedade, safra ou cultura não encontrada' })
    @ApiResponse({ status: 409, description: 'Esta cultura já está registrada para esta propriedade nesta safra' })
    async create(@Body() createCulturaPlantadaDto: CreateCulturaPlantadaDto) {
        return await this.culturaPlantadaService.create(createCulturaPlantadaDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos os plantios' })
    @ApiResponse({
        status: 200,
        description: 'Lista de plantios retornada com sucesso',
        type: [CulturaPlantada]
    })
    async findAll() {
        return await this.culturaPlantadaService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar plantio por ID' })
    @ApiResponse({
        status: 200,
        description: 'Plantio encontrado com sucesso',
        type: CulturaPlantada
    })
    @ApiResponse({ status: 404, description: 'Plantio não encontrado' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.culturaPlantadaService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar plantio' })
    @ApiResponse({
        status: 200,
        description: 'Plantio atualizado com sucesso',
        type: CulturaPlantada
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 404, description: 'Plantio não encontrado' })
    @ApiResponse({ status: 409, description: 'Esta cultura já está registrada para esta propriedade nesta safra' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateCulturaPlantadaDto: UpdateCulturaPlantadaDto) {
        return await this.culturaPlantadaService.update(id, updateCulturaPlantadaDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remover plantio' })
    @ApiResponse({ status: 204, description: 'Plantio removido com sucesso' })
    @ApiResponse({ status: 404, description: 'Plantio não encontrado' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.culturaPlantadaService.remove(id);
    }
}
