import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    // Configuração do Swagger
    const config = new DocumentBuilder()
        .setTitle('Brain Agriculture API')
        .setDescription('API para gerenciamento de produtores rurais e propriedades')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('produtores', 'Operações relacionadas a produtores rurais')
        .addTag('propriedades', 'Operações relacionadas a propriedades rurais')
        .addTag('culturas', 'Operações relacionadas a culturas')
        .addTag('safras', 'Operações relacionadas a safras')
        .addTag('culturas-plantadas', 'Operações relacionadas a culturas plantadas')
        .build();
    
    const document = SwaggerModule.createDocument(app, config);

    const customOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            defaultModelsExpandDepth: -1, // Esta configuração oculta a seção de schemas
        },
    };
    
    SwaggerModule.setup('api', app, document, customOptions);

    // Configuração do CORS
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    });

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    await app.listen(3000);
}
bootstrap();