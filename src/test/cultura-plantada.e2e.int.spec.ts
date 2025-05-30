import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

jest.setTimeout(20000);

describe('CulturaPlantadaController (e2e)', () => {
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

    it('/culturas-plantadas (POST) should create a cultura plantada', async () => {
        // Ajuste os IDs conforme necessário para entidades relacionadas
        const createDto = { cultura_id: 3, safra_id: 1, propriedade_id: 1 };
        const response = await request(app.getHttpServer())
            .post('/culturas-plantadas')
            .send(createDto)
            .expect(201);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.id).toEqual(expect.any(Number));        
        createdId = response.body.id;
    });

    it('/culturas-plantadas (GET) should return an array (find)', async () => {
        const response = await request(app.getHttpServer())
            .get('/culturas-plantadas')
            .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('/culturas-plantadas/:id (GET) should return a cultura plantada by id', async () => {
        const response = await request(app.getHttpServer())
            .get(`/culturas-plantadas/${createdId}`)
            .expect(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.id).toEqual(createdId);
    });

    it('/culturas-plantadas/:id (PUT) should update a cultura plantada', async () => {
        const updateDto = { area_plantada: 200 };
        const response = await request(app.getHttpServer())
            .patch(`/culturas-plantadas/${createdId}`)
            .send(updateDto)
            .expect(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.id).toEqual(createdId);
        expect(response.body.area_plantada).toEqual(200);
    });

    it('/culturas-plantadas/:id (DELETE) should delete a cultura plantada', async () => {
        await request(app.getHttpServer())
            .delete(`/culturas-plantadas/${createdId}`)
            .expect(204);
        // Verifica se foi removido
        await request(app.getHttpServer())
            .get(`/culturas-plantadas/${createdId}`)
            .expect(404);
    });
});
