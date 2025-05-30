import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

jest.setTimeout(20000);

describe('ProdutorController (e2e)', () => {
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

    it('/produtores (POST) should create a produtor', async () => {
        const createDto = { nome: 'Allan Lemes', documento: '079.564.320-90'}; //nao e meu cpf real
        const response = await request(app.getHttpServer())
            .post('/produtores')
            .send(createDto)
            .expect(201);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.id).toEqual(expect.any(Number));
        expect(response.body.nome).toEqual('Allan Lemes');
        createdId = response.body.id;
    });

    it('/produtores (GET) should return an array (find)', async () => {
        const response = await request(app.getHttpServer())
            .get('/produtores')
            .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('/produtores/:id (GET) should return a produtor by id', async () => {
        const response = await request(app.getHttpServer())
            .get(`/produtores/${createdId}`)
            .expect(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.id).toEqual(createdId);
    });

    it('/produtores/:id (PUT) should update a produtor', async () => {
        const updateDto = { nome: 'Allan Lemes Atualizado' };
        const response = await request(app.getHttpServer())
            .patch(`/produtores/${createdId}`)
            .send(updateDto)
            .expect(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.id).toEqual(createdId);
        expect(response.body.nome).toEqual('Allan Lemes Atualizado');
    });

    it('/produtores/:id (DELETE) should delete a produtor', async () => {
        await request(app.getHttpServer())
            .delete(`/produtores/${createdId}`)
            .expect(204);
        // Verifica se foi removido
        await request(app.getHttpServer())
            .get(`/produtores/${createdId}`)
            .expect(404);
    });
});
