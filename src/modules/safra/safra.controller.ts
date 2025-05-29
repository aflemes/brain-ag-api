import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { Safra } from '../../entities/safra.entity';
import { SafraService } from './safra.service';
import { CreateSafraDto } from './dto/create-safra.dto';

@Controller('safras')
export class SafraController {
    constructor(private readonly safraService: SafraService) {}

    @Get()
    async findAll(): Promise<Safra[]> {
        return this.safraService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Safra> {
        return this.safraService.findOne(id);
    }

    @Post()
    async create(@Body() safraData: CreateSafraDto): Promise<Safra> {
        return this.safraService.create(safraData);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number,@Body() safraData: Partial<Safra>): Promise<Safra> {
        return this.safraService.update(id, safraData);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.safraService.remove(id);
    }

    @Get(':id/culturas-plantadas')
    async getCulturasPlantadas(@Param('id', ParseIntPipe) id: number): Promise<Safra> {
        return this.safraService.findOneWithCulturas(id);
    }
}