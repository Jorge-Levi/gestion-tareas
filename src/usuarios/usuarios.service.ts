import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './usuario.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

  async registrar(email: string, password: string): Promise<Usuario> {
    const usuarioExistente = await this.usuarioModel.findOne({ email });
    if (usuarioExistente) {
      throw new ConflictException('El usuario ya existe');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new this.usuarioModel({
      email,
      password: hashedPassword,
    });
    return nuevoUsuario.save();
  }

  async encontrarPorEmail(email: string): Promise<Usuario> {
    return this.usuarioModel.findOne({ email });
  }
}
