import { IsString, IsNotEmpty } from '@nestjs/class-validator';

export class CreateSafraDto {
    @IsString()
    @IsNotEmpty()
    nome: string;
}
