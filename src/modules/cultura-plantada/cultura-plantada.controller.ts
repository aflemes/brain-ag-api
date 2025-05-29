import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CulturaPlantadaService } from './cultura-plantada.service';
import { CreateCulturaPlantadaDto } from './dto/create-cultura-plantada.dto';
import { UpdateCulturaPlantadaDto } from './dto/update-cultura-plantada.dto';

@Controller('culturas-plantadas')
export class CulturaPlantadaController {
    constructor(private readonly culturaPlantadaService: CulturaPlantadaService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createCulturaPlantadaDto: CreateCulturaPlantadaDto) {
        return await this.culturaPlantadaService.create(createCulturaPlantadaDto);
    }

    @Get()
    async findAll() {
        return await this.culturaPlantadaService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.culturaPlantadaService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateCulturaPlantadaDto: UpdateCulturaPlantadaDto) {
        return await this.culturaPlantadaService.update(id, updateCulturaPlantadaDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.culturaPlantadaService.remove(id);
    }
}
