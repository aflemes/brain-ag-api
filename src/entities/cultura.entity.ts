import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CulturaPlantada } from './cultura_plantada.entity';

@Entity('cultura')
export class Cultura {
    @ApiProperty({ description: 'ID único da cultura' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nome da cultura agrícola' })
    @Column()
    nome: string;

    @ApiProperty({ description: 'Lista de plantios desta cultura', type: () => [CulturaPlantada] })
    @OneToMany(() => CulturaPlantada, culturaPlantada => culturaPlantada.cultura)
    culturasPlantadas: CulturaPlantada[];
}
