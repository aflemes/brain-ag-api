import { PartialType } from '@nestjs/mapped-types';
import { CreateCulturaPlantadaDto } from './create-cultura-plantada.dto';

export class UpdateCulturaPlantadaDto extends PartialType(CreateCulturaPlantadaDto) {}
