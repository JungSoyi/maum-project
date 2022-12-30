import { INestApplication } from "@nestjs/common";
import { SwaggerModule, SwaggerCustomOptions, DocumentBuilder } from '@nestjs/swagger';

const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
        persistAuthorization: true,
    }
};

export function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
        .setTitle('정소이 백엔드 코딩 테스트 버전 2')
        .setDescription('백엔드 코딩 테스트 버전 2 과제입니다.')
        .setVersion('1.0.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                name: 'JWT',
                in: 'header',
            },
            'access-token',
        )
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document, swaggerCustomOptions);
}