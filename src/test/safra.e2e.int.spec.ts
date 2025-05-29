import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../app.module';

describe('SafraController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/safra (POST) should create a safra', async () => {
        const createDto = { name: 'Soja' };
        const response = await request(app.getHttpServer())
            .post('/propriedades')
            .send(createDto)
            .expect(201);

        expect(response.body).toEqual(expect.any(Object));

        expect((response.body as object)['id']).toEqual(expect.any(Number));
        expect((response.body as object)['name']).toEqual('Soja');
    });
});