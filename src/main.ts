import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; //DEPENDENCIA PARA DOCUMENTAR EL API
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true, //evitando que los string lleguen como string nest ayuda de forma automatica.
      },
    }),
  );

  //Documentando el API
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('CURSO NEST MODULAR Y PERSISTENCIA DE DATOS MONGO')
    .setVersion('1.0')
    //.addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
