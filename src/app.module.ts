import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TareasModule } from './tareas/tareas.module';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller'; // Asegúrate de que este import esté presente
import { UsuariosModule } from './usuarios/usuarios.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost/gestion-tareas',
    ),
    TareasModule,
    UsuariosModule,
  ],
  controllers: [AppController], // Añade aquí el controlador
})
export class AppModule {}
