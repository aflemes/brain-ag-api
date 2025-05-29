import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { DocumentValidator } from './document-validator';

export function IsValidDocument(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidDocument',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (typeof value !== 'string') return false;
                    const cleanDoc = value.replace(/[^\d]/g, '');
                    return DocumentValidator.isValidDocument(cleanDoc);
                },
                defaultMessage(args: ValidationArguments) {
                    return 'Documento (CPF/CNPJ) inválido';
                }
            }
        });
    };
}

export function IsFormattedDocument(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isFormattedDocument',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    if (typeof value !== 'string') return false;
                    const cleanDoc = value.replace(/[^\d]/g, '');
                    
                    // Verifica se é CPF (XXX.XXX.XXX-XX) ou CNPJ (XX.XXX.XXX/XXXX-XX)
                    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
                    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
                    
                    // Aceita tanto formatado quanto apenas números
                    return cpfRegex.test(value) || 
                           cnpjRegex.test(value) || 
                           /^\d{11}$/.test(cleanDoc) || 
                           /^\d{14}$/.test(cleanDoc);
                },
                defaultMessage(args: ValidationArguments) {
                    return 'Documento deve estar no formato CPF (XXX.XXX.XXX-XX) ou CNPJ (XX.XXX.XXX/XXXX-XX)';
                }
            }
        });
    };
}
