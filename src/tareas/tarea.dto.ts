import { ApiProperty } from '@nestjs/swagger';

export class CrearTareaDto {
  @ApiProperty()
  titulo: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  fechaVencimiento: Date;

  @ApiProperty({ default: 'pendiente' })
  estado?: string;
}

export class ActualizarTareaDto {
  @ApiProperty()
  titulo?: string;

  @ApiProperty()
  descripcion?: string;

  @ApiProperty()
  fechaVencimiento?: Date;

  @ApiProperty({ default: 'pendiente' })
  estado?: string;
}
