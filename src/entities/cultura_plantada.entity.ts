import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Propriedade } from './propriedade.entity';
import { Cultura } from './cultura.entity';
import { Safra } from './safra.entity';

@Entity('cultura_plantada')
export class CulturaPlantada {
    @ApiProperty({ description: 'ID único do plantio' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'ID da propriedade onde a cultura está plantada' })
    @Column()  
    propriedade_id: number;

    @ApiProperty({ description: 'ID da safra em que a cultura foi plantada' })
    @Column()  
    safra_id: number;

    @ApiProperty({ description: 'ID da cultura plantada' })
    @Column()
    cultura_id: number;

    @ApiProperty({ description: 'Dados da propriedade', type: () => Propriedade })
    @ManyToOne(() => Propriedade, propriedade => propriedade.culturasPlantadas)
    @JoinColumn({ name: 'propriedade_id' })
    propriedade: Propriedade;

    @ApiProperty({ description: 'Dados da cultura', type: () => Cultura })
    @ManyToOne(() => Cultura, cultura => cultura.culturasPlantadas)
    @JoinColumn({ name: 'cultura_id' })
    cultura: Cultura;

    @ApiProperty({ description: 'Dados da safra', type: () => Safra })
    @ManyToOne(() => Safra, safra => safra.culturasPlantadas)
    @JoinColumn({ name: 'safra_id' })
    safra: Safra;
}
