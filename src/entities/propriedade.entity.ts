import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Produtor } from './produtor.entity';
import { CulturaPlantada } from './cultura_plantada.entity';

@Entity('propriedade')
export class Propriedade {
    @ApiProperty({ description: 'ID único da propriedade' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'ID do produtor proprietário' })
    @Column()
    produtor_id: number;

    @ApiProperty({ description: 'Nome da propriedade rural' })
    @Column()
    nome: string;

    @ApiProperty({ description: 'Cidade onde está localizada a propriedade' })
    @Column()
    cidade: string;

    @ApiProperty({ description: 'Estado onde está localizada a propriedade' })
    @Column()
    estado: string; 

    @ApiProperty({ description: 'Área total da propriedade em hectares' })
    @Column()  
    area_total: number;

    @ApiProperty({ description: 'Área agricultável em hectares' })
    @Column() 
    area_agricultavel: number; 

    @ApiProperty({ description: 'Área de vegetação em hectares' })
    @Column()   
    area_vegetacao: number; 

    @ApiProperty({ description: 'Dados do produtor proprietário', type: () => Produtor })
    @ManyToOne(() => Produtor, produtor => produtor.propriedades)
    @JoinColumn({ name: 'produtor_id' })
    produtor: Produtor;

    @ApiProperty({ description: 'Lista de culturas plantadas na propriedade', type: () => [CulturaPlantada] })
    @OneToMany(() => CulturaPlantada, culturaPlantada => culturaPlantada.propriedade)
    culturasPlantadas: CulturaPlantada[];
}
