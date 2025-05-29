import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturaPlantadaController } from './cultura-plantada.controller';
import { CulturaPlantadaService } from './cultura-plantada.service';
import { CulturaPlantada } from '../../entities/cultura_plantada.entity';
import { PropriedadeModule } from '../propriedade/propriedade.module';
import { SafraModule } from '../safra/safra.module';
import { CulturaModule } from '../cultura/cultura.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CulturaPlantada]),
        PropriedadeModule,
        SafraModule,
        CulturaModule
    ],
    controllers: [CulturaPlantadaController],
    providers: [CulturaPlantadaService],
    exports: [CulturaPlantadaService]
})
export class CulturaPlantadaModule {}
