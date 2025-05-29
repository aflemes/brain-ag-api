import {Controller,Get,Post,Body,Patch,Param,Delete,HttpCode,HttpStatus,ParseIntPipe,Query} from '@nestjs/common';
import { ProdutorService } from './produtor.service';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { UpdateProdutorDto } from './dto/update-produtor.dto';

@Controller('produtores')
export class ProdutorController {
    constructor(private readonly produtorService: ProdutorService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createProdutorDto: CreateProdutorDto) {
        return await this.produtorService.create(createProdutorDto);
    }

    @Get()
    async findAll() {
        return await this.produtorService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.produtorService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateProdutorDto: UpdateProdutorDto) {
        return await this.produtorService.update(id, updateProdutorDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.produtorService.remove(id);
    }
}