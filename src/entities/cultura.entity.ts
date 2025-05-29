import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CulturaPlantada } from './cultura_plantada.entity';

@Entity('cultura')
export class Cultura {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @OneToMany(() => CulturaPlantada, culturaPlantada => culturaPlantada.cultura)
    culturasPlantadas: CulturaPlantada[];
}
