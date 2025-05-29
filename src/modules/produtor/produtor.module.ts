import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutorController } from './produtor.controller';
import { ProdutorService } from './produtor.service';
import { Produtor } from '../../entities/produtor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Produtor])],
    controllers: [ProdutorController],
    providers: [ProdutorService],
    exports: [ProdutorService],
})
export class ProdutorModule {}