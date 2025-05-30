import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

jest.setTimeout(20000);

describe('CulturaController (e2e)', () => {
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

    it('/culturas (POST) should create a cultura', async () => {
        const createDto = { nome: 'Kiwi' };
        const response = await request(app.getHttpServer())
            .post('/culturas')
            .send(createDto)
            .expect(201);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.id).toEqual(expect.any(Number));
        expect(response.body.nome).toEqual('Kiwi');
        createdId = response.body.id;
    });

    it('/culturas (GET) should return an array (find)', async () => {
        const response = await request(app.getHttpServer())
            .get('/culturas')
            .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('/culturas/:id (GET) should return a cultura by id', async () => {
        const response = await request(app.getHttpServer())
            .get(`/culturas/${createdId}`)
            .expect(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.id).toEqual(createdId);
    });

    it('/culturas/:id (PUT) should update a cultura', async () => {
        const updateDto = { nome: 'Kiwi Safrinha' };
        const response = await request(app.getHttpServer())
            .patch(`/culturas/${createdId}`)
            .send(updateDto)
            .expect(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.id).toEqual(createdId);
        expect(response.body.nome).toEqual('Kiwi Safrinha');
    });

    it('/culturas/:id (DELETE) should delete a cultura', async () => {
        await request(app.getHttpServer())
            .delete(`/culturas/${createdId}`)
            .expect(204);
        // Verifica se foi removido
        await request(app.getHttpServer())
            .get(`/culturas/${createdId}`)
            .expect(404);
    });
});
