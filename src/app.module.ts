import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ProdutorModule } from './modules/produtor/produtor.module';
import { PropriedadeModule } from './modules/propriedade/propriedade.module';
import { SafraModule } from './modules/safra.module';
import { CulturaModule } from './modules/cultura/cultura.module';
import { CulturaPlantadaModule } from './modules/cultura-plantada/cultura-plantada.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get('DB_HOST'),
                port: config.get('DB_PORT'),
                username: config.get('DB_USERNAME'),
                password: config.get('DB_PASSWORD'),
                database: config.get('DB_DATABASE'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                logging: false,
            }),
        }),

        ProdutorModule,
        PropriedadeModule,
        SafraModule,
        CulturaModule,
        CulturaPlantadaModule
    ],
})
export class AppModule { }