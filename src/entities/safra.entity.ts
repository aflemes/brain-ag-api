import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CulturaPlantada } from './cultura_plantada.entity';

@Entity('safra')
export class Safra {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()  
    nome: string;

    @OneToMany(() => CulturaPlantada, culturaPlantada => culturaPlantada.safra)
    culturasPlantadas: CulturaPlantada[];
}
