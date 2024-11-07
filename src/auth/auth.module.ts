import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    // Módulo de usuarios para acceder a la lógica de usuarios
    UsuariosModule,

    // Módulo de Passport para la estrategia de autenticación
    PassportModule,

    // Configuración de JWT para autenticación
    JwtModule.register({
      // Usa una variable de entorno para mayor seguridad
      secret: process.env.JWT_SECRET || 'mi_secreto_super_seguro', // Cambia 'tu_secreto' a una variable de entorno en producción
      signOptions: { expiresIn: '3600s' }, // Configura el tiempo de expiración del token
    }),
  ],
  providers: [
    AuthService, // Servicio de autenticación
    JwtStrategy, // Estrategia JWT para validación de tokens
  ],
  controllers: [AuthController], // Controlador de autenticación
  exports: [AuthService], // Exporta AuthService para usarlo en otros módulos
})
export class AuthModule {}
