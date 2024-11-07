import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.schema';
import { ConflictException } from '@nestjs/common';

const mockUsuariosService = {
  registrar: jest.fn(),
  encontrarPorEmail: jest.fn(),
};

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [{ provide: UsuariosService, useValue: mockUsuariosService }],
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
    service = module.get<UsuariosService>(UsuariosService);
  });

  describe('registrar', () => {
    it('debería registrar un nuevo usuario', async () => {
      const usuarioDto = { email: 'test@example.com', password: 'password' };
      const nuevoUsuario = { ...usuarioDto, _id: '123' }; // Simulando un usuario registrado

      mockUsuariosService.registrar.mockResolvedValue(nuevoUsuario);

      const result = await controller.registrar(usuarioDto);
      expect(result).toEqual(nuevoUsuario);
      expect(mockUsuariosService.registrar).toHaveBeenCalledWith(
        usuarioDto.email,
        usuarioDto.password,
      );
    });

    it('debería lanzar una excepción si el usuario ya existe', async () => {
      const usuarioDto = { email: 'test@example.com', password: 'password' };

      mockUsuariosService.registrar.mockRejectedValue(
        new ConflictException('El usuario ya existe'),
      );

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
