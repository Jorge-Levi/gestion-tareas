import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';
import { Tarea, TareaSchema } from './tarea.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tarea.name, schema: TareaSchema }]),
    AuthModule, // Importar módulo de autenticación
  ],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}
