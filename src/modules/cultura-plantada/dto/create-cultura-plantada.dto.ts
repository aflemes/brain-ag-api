import { IsNumber, IsNotEmpty } from '@nestjs/class-validator';

export class CreateCulturaPlantadaDto {
    @IsNumber()
    @IsNotEmpty()
    propriedade_id: number;

    @IsNumber()
    @IsNotEmpty()
    safra_id: number;

    @IsNumber()
    @IsNotEmpty()
    cultura_id: number;
}
