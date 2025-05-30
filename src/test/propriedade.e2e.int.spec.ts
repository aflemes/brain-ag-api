import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

jest.setTimeout(20000);

describe('PropriedadeController (e2e)', () => {
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

    it('/propriedades (POST) should create a propriedade', async () => {
        const createDto = { nome: 'Fazenda Boa Vista', cidade: 'Uberlândia', estado: 'MG', area_agricultavel: 1000, area_total: 3000, area_vegetacao: 2000, produtor_id: 8 };
        const response = await request(app.getHttpServer())
            .post('/propriedades')
            .send(createDto)
            .expect(201);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.id).toEqual(expect.any(Number));
        expect(response.body.nome).toEqual('Fazenda Boa Vista');
        createdId = response.body.id;
    });

    it('/propriedades (GET) should return an array (find)', async () => {
        const response = await request(app.getHttpServer())
            .get('/propriedades')
            .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('/propriedades/:id (GET) should return a propriedade by id', async () => {
        const response = await request(app.getHttpServer())
            .get(`/propriedades/${createdId}`)
            .expect(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.id).toEqual(createdId);
    });

    it('/propriedades/:id (PUT) should update a propriedade', async () => {
        const updateDto = { nome: 'Fazenda Boa Vista Atualizada' };
        const response = await request(app.getHttpServer())
            .patch(`/propriedades/${createdId}`)
            .send(updateDto)
            .expect(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.id).toEqual(createdId);
        expect(response.body.nome).toEqual('Fazenda Boa Vista Atualizada');
    });

    it('/propriedades/:id (DELETE) should delete a propriedade', async () => {
        await request(app.getHttpServer())
            .delete(`/propriedades/${createdId}`)
            .expect(204);
        // Verifica se foi removido
        await request(app.getHttpServer())
            .get(`/propriedades/${createdId}`)
            .expect(404);
    });
});
