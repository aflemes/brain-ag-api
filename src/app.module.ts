import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ProdutorModule } from './modules/produtor/produtor.module';
import { PropriedadeModule } from './modules/propriedade/propriedade.module';
import { SafraModule } from './modules/safra/safra.module';
import { CulturaModule } from './modules/cultura/cultura.module';
import { CulturaPlantadaModule } from './modules/cultura-plantada/cultura-plantada.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        ProdutorModule,
        PropriedadeModule,
        SafraModule,
        CulturaModule,
        CulturaPlantadaModule
    ],
})
export class AppModule { }