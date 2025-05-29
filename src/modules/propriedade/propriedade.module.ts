import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropriedadeController } from './propriedade.controller';
import { PropriedadeService } from './propriedade.service';
import { Propriedade } from '../../entities/propriedade.entity';
import { ProdutorModule } from '../produtor/produtor.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Propriedade]),
        ProdutorModule
    ],
    controllers: [PropriedadeController],
    providers: [PropriedadeService],
    exports: [PropriedadeService]
})
export class PropriedadeModule {}
