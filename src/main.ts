import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigModule } from '@nestjs/config'; // Importa ConfigModule para manejar variables de entorno

async function bootstrap() {
  // Carga las variables de entorno desde el archivo .env
  ConfigModule.forRoot(); // Debe ser llamado antes de bootstrap

  // Crea la aplicación NestJS
  const app = await NestFactory.create(AppModule);

  // Configura Swagger para la documentación de la API
  const options = new DocumentBuilder()
    .setTitle('Gestión de Tareas') // Título de la API
    .setDescription('API para gestionar tareas') // Descripción de la API
    .setVersion('1.0') // Versión de la API
    .addTag('tareas') // Etiquetas para agrupar endpoints
    .addBearerAuth() // Añade autenticación Bearer para JWT
    .build();

  // Crea el documento Swagger
  const document = SwaggerModule.createDocument(app, options);

  // Configura la ruta de acceso para la documentación de Swagger
  SwaggerModule.setup('api', app, document); // Documentación accesible en /api

  // Escucha en el puerto definido por la variable de entorno o en 3000 por defecto
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
