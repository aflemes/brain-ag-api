export class DocumentValidator {
    static isValidCPF(cpf: string): boolean {
        cpf = cpf.replace(/[^\d]/g, '');

        if (cpf.length !== 11) return false;
        if (/^(\d)\1{10}$/.test(cpf)) return false;

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let rest = 11 - (sum % 11);
        let digit1 = rest >= 10 ? 0 : rest;

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        rest = 11 - (sum % 11);
        let digit2 = rest >= 10 ? 0 : rest;

        return digit1 === parseInt(cpf.charAt(9)) && digit2 === parseInt(cpf.charAt(10));
    }

    static isValidCNPJ(cnpj: string): boolean {
        cnpj = cnpj.replace(/[^\d]/g, '');

        if (cnpj.length !== 14) return false;
        if (/^(\d)\1{13}$/.test(cnpj)) return false;

        const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        let sum = 0;
        for (let i = 0; i < 12; i++) {
            sum += parseInt(cnpj.charAt(i)) * weights1[i];
        }
        let rest = sum % 11;
        let digit1 = rest < 2 ? 0 : 11 - rest;

        sum = 0;
        for (let i = 0; i < 13; i++) {
            sum += parseInt(cnpj.charAt(i)) * weights2[i];
        }
        rest = sum % 11;
        let digit2 = rest < 2 ? 0 : 11 - rest;

        return digit1 === parseInt(cnpj.charAt(12)) && digit2 === parseInt(cnpj.charAt(13));
    }

    static isValidDocument(document: string): boolean {
        const cleanDoc = document.replace(/[^\d]/g, '');
        return cleanDoc.length === 11 ? this.isValidCPF(cleanDoc) : this.isValidCNPJ(cleanDoc);
    }
}
