import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

jest.setTimeout(20000);

describe('SafraController (e2e)', () => {
    let app: INestApplication;
    let createdId: number;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/safras (POST) should create a safra', async () => {
        const createDto = { nome: 'Safra 2031 Primavera' };
        const response = await request(app.getHttpServer())
            .post('/safras')
            .send(createDto)
            .expect(201);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.id).toEqual(expect.any(Number));
        expect(response.body.nome).toEqual('Safra 2031 Primavera');
        createdId = response.body.id;
    });

    it('/safras (GET) should return an array (find)', async () => {
        const response = await request(app.getHttpServer())
            .get('/safras')
            .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('/safras/:id (GET) should return a safra by id', async () => {
        const response = await request(app.getHttpServer())
            .get(`/safras/${createdId}`)
            .expect(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.id).toEqual(createdId);
    });

    it('/safras/:id (PUT) should update a safra', async () => {
        const updateDto = { nome: 'Safra 2031 Primavera' };
        const response = await request(app.getHttpServer())
            .patch(`/safras/${createdId}`)
            .send(updateDto)
            .expect(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.id).toEqual(createdId);
        expect(response.body.nome).toEqual('Safra 2031 Primavera');
    });

    it('/safras/:id (DELETE) should delete a safra', async () => {
        await request(app.getHttpServer())
            .delete(`/safras/${createdId}`)
            .expect(204);
        // Verifica se foi removido
        await request(app.getHttpServer())
            .get(`/safras/${createdId}`)
            .expect(404);
    });
});