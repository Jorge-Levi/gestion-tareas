import { Body, Controller, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.schema';

@Controller('api/registro')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async registrar(
    @Body() body: { email: string; password: string },
  ): Promise<Usuario> {
    return this.usuariosService.registrar(body.email, body.password);
  }
}
