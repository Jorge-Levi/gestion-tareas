import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Clase que representa el esquema de un Usuario.
 * Hereda de Document para que sea compatible con Mongoose.
 */
@Schema()
export class Usuario extends Document {
  /**
   * El correo electrónico del usuario.
   * Debe ser único y requerido.
   * Se ha agregado un índice para mejorar la eficiencia de las consultas.
   */
  @Prop({ required: true, unique: true, index: true })
  email: string;

  /**
   * La contraseña del usuario.
   * Este campo es requerido.
   */
  @Prop({ required: true })
  password: string;
}

// Crea el esquema de Mongoose a partir de la clase Usuario.
export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
