import { PartialType } from '@nestjs/mapped-types';
import { CreatePropriedadeDto } from './create-propriedade.dto';

export class UpdatePropriedadeDto extends PartialType(CreatePropriedadeDto) {}
