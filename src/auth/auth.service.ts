import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const usuario = await this.usuariosService.encontrarPorEmail(email);
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    const payload = { email: usuario.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
