import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcryptjs';

/**
 * Servicio de autenticación para gestionar el inicio de sesión de usuarios.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Inicia sesión un usuario y genera un token JWT si las credenciales son correctas.
   *
   * @param email - El correo electrónico del usuario.
   * @param password - La contraseña del usuario.
   * @throws UnauthorizedException si las credenciales son incorrectas.
   * @returns Un objeto que contiene el token de acceso.
   */
  async login(email: string, password: string) {
    // Busca el usuario por email
    const usuario = await this.usuariosService.encontrarPorEmail(email);

    // Verifica si el usuario existe y si la contraseña es correcta
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Genera el payload para el token JWT
    const payload = { email: usuario.email };

    // Devuelve el token de acceso
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
