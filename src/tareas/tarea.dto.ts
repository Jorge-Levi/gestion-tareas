import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator'; // Importa decoradores para validación

/**
 * DTO para crear una nueva tarea.
 */
export class CrearTareaDto {
  @ApiProperty({
    description: 'Título de la tarea. Este campo es obligatorio.',
    example: 'Comprar alimentos',
  })
  @IsString() // Valida que sea una cadena
  titulo: string;

  @ApiProperty({
    description: 'Descripción de la tarea. Este campo es opcional.',
    example: 'Comprar frutas y verduras para la semana',
    required: false, // Indica que este campo es opcional
  })
  @IsOptional() // Indica que este campo es opcional
  @IsString() // Valida que sea una cadena
  descripcion?: string; // Campo opcional

  @ApiProperty({
    description: 'Fecha de vencimiento de la tarea. Este campo es obligatorio.',
    example: '2024-12-31',
  })
  @IsDateString() // Valida que sea una fecha en formato de cadena
  fechaVencimiento: Date;

  @ApiProperty({
    description:
      'Estado actual de la tarea. El valor por defecto es "pendiente".',
    default: 'pendiente',
    example: 'pendiente',
  })
  @IsOptional() // Indica que este campo es opcional
  @IsString() // Valida que sea una cadena
  estado?: string; // Campo opcional
}

/**
 * DTO para actualizar una tarea existente.
 */
export class ActualizarTareaDto {
  @ApiProperty({
    description: 'Título de la tarea. Este campo es opcional.',
    example: 'Comprar alimentos',
    required: false, // Indica que este campo es opcional
  })
  @IsOptional() // Indica que este campo es opcional
  @IsString() // Valida que sea una cadena
  titulo?: string; // Campo opcional

  @ApiProperty({
    description: 'Descripción de la tarea. Este campo es opcional.',
    example: 'Comprar frutas y verduras para la semana',
    required: false, // Indica que este campo es opcional
  })
  @IsOptional() // Indica que este campo es opcional
  @IsString() // Valida que sea una cadena
  descripcion?: string; // Campo opcional

  @ApiProperty({
    description: 'Fecha de vencimiento de la tarea. Este campo es opcional.',
    example: '2024-12-31',
    required: false, // Indica que este campo es opcional
  })
  @IsOptional() // Indica que este campo es opcional
  @IsDateString() // Valida que sea una fecha en formato de cadena
  fechaVencimiento?: Date; // Campo opcional

  @ApiProperty({
    description:
      'Estado actual de la tarea. El valor por defecto es "pendiente".',
    default: 'pendiente',
    example: 'en progreso',
    required: false, // Indica que este campo es opcional
  })
  @IsOptional() // Indica que este campo es opcional
  @IsString() // Valida que sea una cadena
  estado?: string; // Campo opcional
}
