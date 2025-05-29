import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CulturaService } from './cultura.service';
import { Safra } from '../../entities/safra.entity';
import { CreateCulturaDto } from './dto/create-cultura.dto';
import { Cultura } from 'src/entities/cultura.entity';

@Controller('culturas')
export class CulturaController {
    constructor(private readonly culturaService: CulturaService) {}

    @Get()
    async findAll(): Promise<Safra[]> {
        return this.culturaService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Safra> {
        return this.culturaService.findOne(id);
    }

    @Post()
    async create(@Body() createCulturaDto: CreateCulturaDto): Promise<Cultura> {
        return this.culturaService.create(createCulturaDto);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number,@Body() safraData: Partial<Safra>): Promise<Safra> {
        return this.culturaService.update(id, safraData);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.culturaService.remove(id);
    }
}