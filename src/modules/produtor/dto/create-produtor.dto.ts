import { IsString, IsNotEmpty, Length } from '@nestjs/class-validator';
import { IsValidDocument, IsFormattedDocument } from '../../../utils/document-decorators';

export class CreateProdutorDto {
    @IsString()
    @IsNotEmpty()
    @Length(2, 100)
    nome: string;

    @IsString()
    @IsNotEmpty()
    @IsValidDocument({ message: 'Documento (CPF/CNPJ) inválido' })
    @IsFormattedDocument({ message: 'Documento deve estar no formato XXX.XXX.XXX-XX (CPF) ou XX.XXX.XXX/XXXX-XX (CNPJ)' })
    documento: string;
}