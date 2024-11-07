import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'El correo electrónico del usuario.' })
  email: string;

  @ApiProperty({ description: 'La contraseña del usuario.' })
  password: string;
}
