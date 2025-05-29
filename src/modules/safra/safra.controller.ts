import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SafraService } from './safra.service';
import { CreateSafraDto } from './dto/create-safra.dto';
import { UpdateSafraDto } from './dto/update-safra.dto';
import { Safra } from '../../entities/safra.entity';

@ApiTags('safras')
@Controller('safras')
export class SafraController {
    constructor(private readonly safraService: SafraService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Criar nova safra' })
    @ApiResponse({ 
        status: 201, 
        description: 'Safra criada com sucesso',
        type: Safra 
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 409, description: 'Já existe uma safra com este nome' })
    async create(@Body() createSafraDto: CreateSafraDto) {
        return await this.safraService.create(createSafraDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas as safras' })
    @ApiResponse({ 
        status: 200, 
        description: 'Lista de safras retornada com sucesso',
        type: [Safra]
    })
    async findAll() {
        return await this.safraService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar safra por ID' })
    @ApiParam({ name: 'id', description: 'ID da safra' })
    @ApiResponse({ 
        status: 200, 
        description: 'Safra encontrada com sucesso',
        type: Safra
    })
    @ApiResponse({ status: 404, description: 'Safra não encontrada' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.safraService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar safra' })
    @ApiParam({ name: 'id', description: 'ID da safra' })
    @ApiResponse({ 
        status: 200, 
        description: 'Safra atualizada com sucesso',
        type: Safra
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 404, description: 'Safra não encontrada' })
    @ApiResponse({ status: 409, description: 'Já existe uma safra com este nome' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateSafraDto: UpdateSafraDto) {
        return await this.safraService.update(id, updateSafraDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remover safra' })
    @ApiParam({ name: 'id', description: 'ID da safra' })
    @ApiResponse({ status: 204, description: 'Safra removida com sucesso' })
    @ApiResponse({ status: 404, description: 'Safra não encontrada' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.safraService.remove(id);
    }

    @Get(':id/culturas-plantadas')
    async getCulturasPlantadas(@Param('id', ParseIntPipe) id: number): Promise<Safra> {
        return this.safraService.findOneWithCulturas(id);
    }
}