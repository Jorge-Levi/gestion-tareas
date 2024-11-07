import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para la creación de un nuevo usuario.
 */
export class CrearUsuarioDto {
  @ApiProperty({
    description: 'El correo electrónico del usuario. Debe ser único y válido.',
    example: 'usuario@ejemplo.com',
    required: true, // Indica que este campo es obligatorio
  })
  email: string;

  @ApiProperty({
    description:
      'La contraseña del usuario. Debe tener al menos 8 caracteres y contener letras y números.',
    example: 'contraseñaSegura123',
    required: true, // Indica que este campo es obligatorio
  })
  password: string;
}
