import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { newDb } from 'pg-mem';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                const db = newDb({
                    autoCreateForeignKeyIndices: true,
                });

                // Necessário para fazer o TypeORM funcionar com pg-mem
                db.public.registerFunction({
                    name: 'current_database',
                    implementation: () => 'test',
                });

                // Aqui você pode adicionar dados iniciais se necessário
                const connection = await db.adapters.createTypeormConnection({
                    type: 'postgres',
                    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
                    synchronize: true,
                    logging: false,
                });

                return connection.options;
            },
        }),
    ],
})
export class DatabaseTestModule { }
