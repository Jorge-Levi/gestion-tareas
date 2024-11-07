import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura Swagger
  const options = new DocumentBuilder()
    .setTitle('Gestión de Tareas')
    .setDescription('API para gestionar tareas')
    .setVersion('1.0')
    .addTag('tareas') // Puedes añadir más etiquetas si lo necesitas
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); // Documentación accesible en /api

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
