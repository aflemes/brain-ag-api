import { Module } from '@nestjs/common';
import { SafraController } from './safra.controller';
import { SafraService } from './safra.service';
import { Safra } from 'src/entities/safra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Safra])],
    controllers: [SafraController],
    providers: [SafraService],
    exports: [SafraService],
})
export class SafraModule { }
