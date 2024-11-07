import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tarea extends Document {
  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  fechaVencimiento: Date;

  @Prop({ default: 'pendiente' })
  estado: string;
}

export const TareaSchema = SchemaFactory.createForClass(Tarea);
