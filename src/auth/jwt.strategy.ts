import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from '../usuarios/usuarios.service';

/**
 * Estrategia de autenticación JWT.
 * Esta clase extiende la estrategia de Passport para manejar la validación de tokens JWT.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usuariosService: UsuariosService) {
    super({
      // Extrae el token JWT del encabezado de autorización como un Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // No ignorar la expiración del token
      secretOrKey: process.env.JWT_SECRET || 'mi_secreto_super_seguro', // Usa una variable de entorno para mayor seguridad
    });
  }

  /**
   * Valida el payload del token JWT.
   * @param payload - El payload del token, que debería contener el email del usuario.
   * @returns El usuario encontrado en la base de datos o null si no se encuentra.
   */
  async validate(payload: any) {
    // Busca y devuelve el usuario asociado al email del payload.
    const usuario = await this.usuariosService.encontrarPorEmail(payload.email);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario; // Devuelve el usuario para ser utilizado en el request
  }
}
