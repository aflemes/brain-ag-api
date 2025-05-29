import {Controller,Get,Post,Body,Patch,Param,Delete,HttpCode,HttpStatus,ParseIntPipe,Query} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProdutorService } from './produtor.service';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { UpdateProdutorDto } from './dto/update-produtor.dto';
import { Produtor } from '../../entities/produtor.entity';

@ApiTags('produtores')
@Controller('produtores')
export class ProdutorController {
    constructor(private readonly produtorService: ProdutorService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Criar novo produtor' })
    @ApiResponse({ 
        status: 201, 
        description: 'Produtor criado com sucesso',
        type: Produtor 
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 409, description: 'Documento já cadastrado' })
    async create(@Body() createProdutorDto: CreateProdutorDto) {
        return await this.produtorService.create(createProdutorDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos os produtores' })
    @ApiResponse({ 
        status: 200, 
        description: 'Lista de produtores retornada com sucesso',
        type: [Produtor]
    })
    async findAll() {
        return await this.produtorService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar produtor por ID' })
    @ApiParam({ name: 'id', description: 'ID do produtor' })
    @ApiResponse({ 
        status: 200, 
        description: 'Produtor encontrado com sucesso',
        type: Produtor
    })
    @ApiResponse({ status: 404, description: 'Produtor não encontrado' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.produtorService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar produtor' })
    @ApiParam({ name: 'id', description: 'ID do produtor' })
    @ApiResponse({ 
        status: 200, 
        description: 'Produtor atualizado com sucesso',
        type: Produtor
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 404, description: 'Produtor não encontrado' })
    @ApiResponse({ status: 409, description: 'Documento já cadastrado' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateProdutorDto: UpdateProdutorDto) {
        return await this.produtorService.update(id, updateProdutorDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remover produtor' })
    @ApiParam({ name: 'id', description: 'ID do produtor' })
    @ApiResponse({ status: 204, description: 'Produtor removido com sucesso' })
    @ApiResponse({ status: 404, description: 'Produtor não encontrado' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.produtorService.remove(id);
    }
}