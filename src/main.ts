import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigModule } from '@nestjs/config'; // Importa ConfigModule para manejar variables de entorno

async function bootstrap() {
  // Carga las variables de entorno desde el archivo .env
  ConfigModule.forRoot(); // Asegúrate de que este método se llame antes de iniciar la aplicación

  // Crea la aplicación NestJS
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger para la documentación de la API
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Gestión de Tareas') // Título de la API
    .setDescription('API para gestionar tareas') // Descripción general de la API
    .setVersion('1.0') // Versión actual de la API
    .addTag('tareas') // Etiqueta para agrupar los endpoints relacionados con tareas
    .addBearerAuth() // Añade autenticación Bearer para JWT
    .build();

  // Genera el documento Swagger
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);

  // Configura la ruta para acceder a la documentación de Swagger
  SwaggerModule.setup('api', app, swaggerDocument); // Accede a la documentación en /api

  // Inicia el servidor en el puerto especificado en las variables de entorno o en 3000 por defecto
  const port = process.env.PORT || 3000; // Se define el puerto a utilizar
  await app.listen(port);
  console.log(`Servidor escuchando en http://localhost:${port}`); // Mensaje en consola con la URL
}

// Llama a la función bootstrap para iniciar la aplicación
bootstrap();
