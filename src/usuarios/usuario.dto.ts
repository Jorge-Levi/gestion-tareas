import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para la creación de un nuevo usuario.
 */
export class CrearUsuarioDto {
  @ApiProperty({
    description: 'El correo electrónico del usuario. Debe ser único y válido.',
    example: 'usuario@ejemplo.com',
  })
  email: string;

  @ApiProperty({
    description: 'La contraseña del usuario. Debe tener al menos 8 caracteres.',
    example: 'contraseñaSegura123',
  })
  password: string;
}
