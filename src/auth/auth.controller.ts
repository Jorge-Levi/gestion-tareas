import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './login.dto'; // Asegúrate de tener un DTO para la solicitud de inicio de sesión

@ApiTags('Autenticación')
@Controller('api/login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Inicia sesión de un usuario y devuelve un token JWT.
   * @param body - Contiene las credenciales del usuario (email y password).
   * @returns Un objeto con el token de acceso.
   */
  @Post()
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}
