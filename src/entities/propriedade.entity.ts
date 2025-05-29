import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Produtor } from './produtor.entity';
import { CulturaPlantada } from './cultura_plantada.entity';

@Entity('propriedade')
export class Propriedade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    produtor_id: number;

    @Column()
    nome: string;

    @Column()
    cidade: string;

    @Column()
    estado: string; 

    @Column()  
    area_total: number;

    @Column() 
    area_agricultavel: number; 

    @Column()   
    area_vegetacao: number; 

    @ManyToOne(() => Produtor, produtor => produtor.propriedades)
    @JoinColumn({ name: 'produtor_id' })
    produtor: Produtor;

    @OneToMany(() => CulturaPlantada, culturaPlantada => culturaPlantada.propriedade)
    culturasPlantadas: CulturaPlantada[];
}
