import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'; // Importar dotenv para cargar variables de entorno
import { TareasModule } from './tareas/tareas.module'; // Importar el módulo de tareas
import { UsuariosModule } from './usuarios/usuarios.module'; // Importar el módulo de usuarios
import { AppController } from './app.controller'; // Importar el controlador principal de la aplicación

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

@Module({
  imports: [
    // Configurar la conexión a la base de datos MongoDB
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost/gestion-tareas', // Usar la URI de MongoDB de las variables de entorno o el valor por defecto
    ),
    TareasModule, // Importar el módulo de tareas para manejar la lógica de tareas
    UsuariosModule, // Importar el módulo de usuarios para manejar la lógica de usuarios
  ],
  controllers: [AppController], // Registrar el controlador principal de la aplicación
})
export class AppModule {}
