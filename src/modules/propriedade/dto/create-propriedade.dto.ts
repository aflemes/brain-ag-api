import { IsString, IsNotEmpty, IsNumber } from '@nestjs/class-validator';

export class CreatePropriedadeDto {
    @IsNumber()
    produtor_id: number;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    cidade: string;

    @IsString()
    @IsNotEmpty()
    estado: string;

    @IsNumber()
    area_total: number;

    @IsNumber()
    area_agricultavel: number;

    @IsNumber()
    area_vegetacao: number;
}
