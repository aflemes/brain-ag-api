import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CulturaPlantada } from './cultura_plantada.entity';

@Entity('safra')
export class Safra {
    @ApiProperty({ description: 'ID único da safra' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nome ou identificação da safra' })
    @Column()  
    nome: string;

    @ApiProperty({ description: 'Lista de culturas plantadas nesta safra', type: () => [CulturaPlantada] })
    @OneToMany(() => CulturaPlantada, culturaPlantada => culturaPlantada.safra)
    culturasPlantadas: CulturaPlantada[];
}
