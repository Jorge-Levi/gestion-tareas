import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Importamos el módulo de Mongoose para la integración con MongoDB
import { UsuariosController } from './usuarios.controller'; // Importamos el controlador de usuarios
import { UsuariosService } from './usuarios.service'; // Importamos el servicio de usuarios
import { Usuario, UsuarioSchema } from './usuario.schema'; // Importamos el esquema de usuario y su modelo

/**
 * Módulo de Usuarios
 *
 * Este módulo se encarga de la gestión de usuarios, incluyendo la creación y autenticación.
 *
 * - Controllers: UsuariosController
 * - Providers: UsuariosService
 * - Imports: Configuración del modelo de usuario con Mongoose
 */
@Module({
  imports: [
    // Configuramos Mongoose para que use el esquema de Usuario
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
  ],
  controllers: [UsuariosController], // Registro del controlador de usuarios
  providers: [UsuariosService], // Registro del servicio de usuarios
  exports: [UsuariosService], // Exportamos el servicio para poder utilizarlo en otros módulos
})
export class UsuariosModule {}
