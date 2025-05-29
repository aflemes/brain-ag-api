import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Propriedade } from './propriedade.entity';
import { Cultura } from './cultura.entity';
import { Safra } from './safra.entity';

@Entity('cultura_plantada')
export class CulturaPlantada {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()  
    propriedade_id: number;

    @Column()  
    safra_id: number;

    @Column()
    cultura_id: number;

    @ManyToOne(() => Propriedade, propriedade => propriedade.culturasPlantadas)
    @JoinColumn({ name: 'propriedade_id' })
    propriedade: Propriedade;

    @ManyToOne(() => Cultura, cultura => cultura.culturasPlantadas)
    @JoinColumn({ name: 'cultura_id' })
    cultura: Cultura;

    @ManyToOne(() => Safra, safra => safra.culturasPlantadas)
    @JoinColumn({ name: 'safra_id' })
    safra: Safra;
}
