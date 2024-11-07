import { Test, TestingModule } from '@nestjs/testing'; // Importa las herramientas de prueba de NestJS
import { UsuariosController } from './usuarios.controller'; // Importa el controlador de usuarios
import { UsuariosService } from './usuarios.service'; // Importa el servicio de usuarios
import { ConflictException } from '@nestjs/common'; // Importa la excepción de conflicto

// Simulación del servicio de usuarios
const mockUsuariosService = {
  registrar: jest.fn(), // Simula el método de registro
  encontrarPorEmail: jest.fn(), // Simula el método para encontrar usuario por email
};

describe('UsuariosController', () => {
  let controller: UsuariosController; // Variable para el controlador
  let service: UsuariosService; // Variable para el servicio

  // Configuración del módulo de pruebas antes de cada prueba
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController], // Inyecta el controlador
      providers: [{ provide: UsuariosService, useValue: mockUsuariosService }], // Inyecta el servicio simulado
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController); // Obtiene una instancia del controlador
    service = module.get<UsuariosService>(UsuariosService); // Obtiene una instancia del servicio
  });

  describe('registrar', () => {
    it('debería registrar un nuevo usuario', async () => {
      // Simulación de un nuevo usuario
      const usuarioDto = { email: 'test@example.com', password: 'password' };
      const nuevoUsuario = { ...usuarioDto, _id: '123' }; // Simula un usuario registrado

      // Configura el retorno simulado del servicio
      mockUsuariosService.registrar.mockResolvedValue(nuevoUsuario);

      // Ejecuta el método de registro y verifica el resultado
      const result = await controller.registrar(usuarioDto);
      expect(result).toEqual(nuevoUsuario);
      expect(mockUsuariosService.registrar).toHaveBeenCalledWith(
        usuarioDto.email,
        usuarioDto.password,
      );
    });

    it('debería lanzar una excepción si el usuario ya existe', async () => {
      // Simulación de un usuario existente
      const usuarioDto = { email: 'test@example.com', password: 'password' };

      // Configura el servicio para lanzar una excepción
      mockUsuariosService.registrar.mockRejectedValue(
        new ConflictException('El usuario ya existe'),
      );

      // Verifica que el método lance la excepción esperada
      await expect(controller.registrar(usuarioDto)).rejects.toThrow(
        ConflictException,
      );
      expect(mockUsuariosService.registrar).toHaveBeenCalledWith(
        usuarioDto.email,
        usuarioDto.password,
      );
    });
  });
});
