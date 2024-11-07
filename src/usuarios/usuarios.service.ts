import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './usuario.schema';
import * as bcrypt from 'bcryptjs';

/**
 * Servicio para gestionar operaciones relacionadas con los usuarios.
 */
@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

  /**
   * Registra un nuevo usuario.
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @returns El nuevo usuario registrado.
   * @throws ConflictException si el usuario ya existe.
   */
  async registrar(email: string, password: string): Promise<Usuario> {
    const usuarioExistente = await this.usuarioModel.findOne({ email });
    if (usuarioExistente) {
      throw new ConflictException('El usuario ya existe');
    }

    // Hash de la contraseña antes de guardarla en la base de datos.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear una nueva instancia del usuario con el email y la contraseña encriptada.
    const nuevoUsuario = new this.usuarioModel({
      email,
      password: hashedPassword,
    });

    // Guardar el nuevo usuario en la base de datos y devolverlo.
    return nuevoUsuario.save();
  }

  /**
   * Busca un usuario por su correo electrónico.
   * @param email - Correo electrónico del usuario a buscar.
   * @returns El usuario encontrado o null si no existe.
   */
  async encontrarPorEmail(email: string): Promise<Usuario> {
    return this.usuarioModel.findOne({ email });
  }
}
