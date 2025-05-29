import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Propriedade } from './propriedade.entity';

@Entity('produtor')
export class Produtor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    documento: string;
    
    @OneToMany(() => Propriedade, propriedade => propriedade.produtor)
    propriedades: Propriedade[];

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
