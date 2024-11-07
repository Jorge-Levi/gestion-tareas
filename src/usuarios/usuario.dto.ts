import { ApiProperty } from '@nestjs/swagger';

export class CrearUsuarioDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
