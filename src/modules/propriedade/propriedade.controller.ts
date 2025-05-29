import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PropriedadeService } from './propriedade.service';
import { CreatePropriedadeDto } from './dto/create-propriedade.dto';
import { UpdatePropriedadeDto } from './dto/update-propriedade.dto';
import { Propriedade } from '../../entities/propriedade.entity';

@ApiTags('propriedades')
@Controller('propriedades')
export class PropriedadeController {
    constructor(private readonly propriedadeService: PropriedadeService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Criar nova propriedade' })
    @ApiResponse({ 
        status: 201, 
        description: 'Propriedade criada com sucesso',
        type: Propriedade 
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 404, description: 'Produtor não encontrado' })
    @ApiResponse({ status: 409, description: 'Já existe uma propriedade com este nome na mesma cidade' })
    async create(@Body() createPropriedadeDto: CreatePropriedadeDto) {
        return await this.propriedadeService.create(createPropriedadeDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas as propriedades' })
    @ApiResponse({ 
        status: 200, 
        description: 'Lista de propriedades retornada com sucesso',
        type: [Propriedade]
    })
    async findAll() {
        return await this.propriedadeService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar propriedade por ID' })
    @ApiParam({ name: 'id', description: 'ID da propriedade' })
    @ApiResponse({ 
        status: 200, 
        description: 'Propriedade encontrada com sucesso',
        type: Propriedade
    })
    @ApiResponse({ status: 404, description: 'Propriedade não encontrada' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.propriedadeService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar propriedade' })
    @ApiParam({ name: 'id', description: 'ID da propriedade' })
    @ApiResponse({ 
        status: 200, 
        description: 'Propriedade atualizada com sucesso',
        type: Propriedade
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 404, description: 'Propriedade não encontrada' })
    @ApiResponse({ status: 409, description: 'Já existe uma propriedade com este nome na mesma cidade' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updatePropriedadeDto: UpdatePropriedadeDto) {
        return await this.propriedadeService.update(id, updatePropriedadeDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remover propriedade' })
    @ApiParam({ name: 'id', description: 'ID da propriedade' })
    @ApiResponse({ status: 204, description: 'Propriedade removida com sucesso' })
    @ApiResponse({ status: 404, description: 'Propriedade não encontrada' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.propriedadeService.remove(id);
    }
}
