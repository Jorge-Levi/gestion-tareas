import { Body, Controller, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.schema';
import { CrearUsuarioDto } from './usuario.dto'; // DTO para la creación de usuarios
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('usuarios') // Categoriza los endpoints en Swagger
@Controller('api/registro') // Ruta base para la gestión de usuarios
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post() // Endpoint para registrar un nuevo usuario
  @ApiOperation({ summary: 'Registrar un nuevo usuario' }) // Descripción breve del endpoint
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado correctamente.', // Descripción de la respuesta 201
  })
  @ApiResponse({
    status: 409,
    description: 'El usuario ya existe.', // Descripción de la respuesta 409
  })
  async registrar(
    @Body() body: CrearUsuarioDto, // Usa el DTO para validar la estructura del cuerpo de la solicitud
  ): Promise<Usuario> {
    return this.usuariosService.registrar(body.email, body.password);
  }
}
