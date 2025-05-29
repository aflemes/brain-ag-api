import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Propriedade } from './propriedade.entity';

@Entity('produtor')
export class Produtor {
    @ApiProperty({ description: 'ID único do produtor' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nome do produtor rural' })
    @Column()
    nome: string;

    @ApiProperty({ description: 'CPF ou CNPJ do produtor (apenas números)' })
    @Column()
    documento: string;
    
    @ApiProperty({ description: 'Lista de propriedades do produtor', type: () => [Propriedade] })
    @OneToMany(() => Propriedade, propriedade => propriedade.produtor)
    propriedades: Propriedade[];

    @ApiProperty({ description: 'CPF ou CNPJ formatado' })
    get documentoFormatado(): string {
        const doc = this.documento;
        if (doc.length === 11) {
            // Formata CPF: 000.000.000-00
            return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (doc.length === 14) {
            // Formata CNPJ: 00.000.000/0001-00
            return doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }
        return doc;
    }
}
