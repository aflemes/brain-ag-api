import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CulturaService } from './cultura.service';
import { CreateCulturaDto } from './dto/create-cultura.dto';
import { UpdateCulturaDto } from './dto/update-cultura.dto';
import { Cultura } from '../../entities/cultura.entity';

@ApiTags('culturas')
@Controller('culturas')
export class CulturaController {
    constructor(private readonly culturaService: CulturaService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Criar nova cultura' })
    @ApiResponse({ 
        status: 201, 
        description: 'Cultura criada com sucesso',
        type: Cultura 
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 409, description: 'Já existe uma cultura com este nome' })
    async create(@Body() createCulturaDto: CreateCulturaDto) {
        return await this.culturaService.create(createCulturaDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas as culturas' })
    @ApiResponse({ 
        status: 200, 
        description: 'Lista de culturas retornada com sucesso',
        type: [Cultura]
    })
    async findAll() {
        return await this.culturaService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar cultura por ID' })
    @ApiParam({ name: 'id', description: 'ID da cultura' })
    @ApiResponse({ 
        status: 200, 
        description: 'Cultura encontrada com sucesso',
        type: Cultura
    })
    @ApiResponse({ status: 404, description: 'Cultura não encontrada' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.culturaService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar cultura' })
    @ApiParam({ name: 'id', description: 'ID da cultura' })
    @ApiResponse({ 
        status: 200, 
        description: 'Cultura atualizada com sucesso',
        type: Cultura
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 404, description: 'Cultura não encontrada' })
    @ApiResponse({ status: 409, description: 'Já existe uma cultura com este nome' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateCulturaDto: UpdateCulturaDto) {
        return await this.culturaService.update(id, updateCulturaDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remover cultura' })
    @ApiParam({ name: 'id', description: 'ID da cultura' })
    @ApiResponse({ status: 204, description: 'Cultura removida com sucesso' })
    @ApiResponse({ status: 404, description: 'Cultura não encontrada' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.culturaService.remove(id);
    }
}