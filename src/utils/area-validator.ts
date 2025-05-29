import { BadRequestException } from '@nestjs/common';

export class InvalidAreaException extends BadRequestException {
    constructor() {
        super('A soma das áreas agricultável e de vegetação não pode ultrapassar a área total');
    }
}
