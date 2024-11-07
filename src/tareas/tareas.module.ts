import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';
import { Tarea, TareaSchema } from './tarea.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tarea.name, schema: TareaSchema }]),
  ],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}
