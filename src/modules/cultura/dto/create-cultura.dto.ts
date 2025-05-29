import { IsString, IsNotEmpty } from '@nestjs/class-validator';

export class CreateCulturaDto {
    @IsString()
    @IsNotEmpty()
    nome: string;
}
