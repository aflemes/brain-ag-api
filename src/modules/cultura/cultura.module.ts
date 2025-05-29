import { Module } from '@nestjs/common';
import { CulturaController } from './cultura.controller';
import { CulturaService } from './cultura.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cultura } from '../../entities/cultura.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cultura])],
    controllers: [CulturaController],
    providers: [CulturaService],
    exports: [CulturaService],
})
export class CulturaModule { }
