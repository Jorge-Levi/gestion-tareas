import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Esquema para la entidad Tarea.
 * Este esquema define la estructura de los documentos de tarea en la base de datos.
 */
@Schema({ timestamps: true }) // Agregado para gestionar automáticamente createdAt y updatedAt
export class Tarea extends Document {
  @Prop({ required: true, index: true }) // El título es obligatorio y se ha indexado para optimizar las consultas
  titulo: string;

  @Prop({ required: true }) // La descripción es obligatoria
  descripcion: string;

  @Prop({ required: true }) // La fecha de vencimiento es obligatoria
  fechaVencimiento: Date;

  @Prop({ default: 'pendiente' }) // Estado por defecto 'pendiente'
  estado: string;
}

// Crear el esquema a partir de la clase Tarea
export const TareaSchema = SchemaFactory.createForClass(Tarea);
