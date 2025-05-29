import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { PropriedadeService } from './propriedade.service';
import { CreatePropriedadeDto } from './dto/create-propriedade.dto';
import { UpdatePropriedadeDto } from './dto/update-propriedade.dto';

@Controller('propriedades')
export class PropriedadeController {
    constructor(private readonly propriedadeService: PropriedadeService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createPropriedadeDto: CreatePropriedadeDto) {
        return await this.propriedadeService.create(createPropriedadeDto);
    }

    @Get()
    async findAll() {
        return await this.propriedadeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.propriedadeService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updatePropriedadeDto: UpdatePropriedadeDto) {
        return await this.propriedadeService.update(id, updatePropriedadeDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.propriedadeService.remove(id);
    }
}
