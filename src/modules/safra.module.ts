import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Safra } from '../entities/safra.entity';
import { SafraController } from './safra/safra.controller';
import { SafraService } from './safra/safra.service';

@Module({
    imports: [TypeOrmModule.forFeature([Safra])],
    controllers: [SafraController],
    providers: [SafraService],
    exports: [SafraService],
})
export class SafraModule {}