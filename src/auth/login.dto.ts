import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) para el inicio de sesión de un usuario.
 * Este objeto se utiliza para validar y tipar los datos recibidos en las solicitudes de inicio de sesión.
 */
export class LoginDto {
  @ApiProperty({
    description: 'El correo electrónico del usuario. Debe ser un email válido.',
    example: 'usuario@ejemplo.com', // Ejemplo de uso
  })
  email: string;

  @ApiProperty({
    description:
      'La contraseña del usuario. Debe contener al menos 8 caracteres y ser segura.',
    example: 'ContraseñaSegura123', // Ejemplo de uso
  })
  password: string;
}
