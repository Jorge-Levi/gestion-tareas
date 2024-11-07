import { Body, Controller, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.schema';
import { CrearUsuarioDto } from './usuario.dto'; // Asegúrate de haber creado este DTO
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('usuarios') // Etiqueta para categorizar los endpoints en Swagger
@Controller('api/registro')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado correctamente.',
  }) // Respuesta 201
  @ApiResponse({ status: 409, description: 'El usuario ya existe.' }) // Respuesta 409 para conflicto
  async registrar(
    @Body() body: CrearUsuarioDto, // Usa el DTO para definir la estructura del cuerpo
  ): Promise<Usuario> {
    return this.usuariosService.registrar(body.email, body.password);
  }
}
