import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';
import { Tarea, TareaSchema } from './tarea.schema';
import { AuthModule } from '../auth/auth.module';

/**
 * Módulo para gestionar las tareas.
 * Este módulo contiene el controlador y el servicio para la gestión de tareas,
 * así como la configuración del modelo de Mongoose.
 */
@Module({
  imports: [
    // Importa el módulo de Mongoose para definir el modelo de Tarea
    MongooseModule.forFeature([{ name: Tarea.name, schema: TareaSchema }]),
    AuthModule, // Importa el módulo de autenticación para proteger los endpoints
  ],
  controllers: [TareasController], // Registra el controlador de tareas
  providers: [TareasService], // Registra el servicio de tareas
})
export class TareasModule {}
