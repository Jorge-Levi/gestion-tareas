import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { getModelToken } from '@nestjs/mongoose';
import { Usuario } from './usuario.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { ConflictException, NotFoundException } from '@nestjs/common';

const mockUsuarioModel = {
  findOne: jest.fn(),
  create: jest.fn(),
};

describe('UsuariosService', () => {
  let service: UsuariosService;
  let model: Model<Usuario>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: getModelToken(Usuario.name),
          useValue: mockUsuarioModel,
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    model = module.get<Model<Usuario>>(getModelToken(Usuario.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registrar', () => {
    it('debería registrar un nuevo usuario', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      mockUsuarioModel.findOne.mockResolvedValue(null); // Simula que el usuario no existe
      mockUsuarioModel.create.mockResolvedValue({
        email,
        password: hashedPassword,
      });

      const result = await service.registrar(email, password);
      expect(result).toEqual({ email, password: hashedPassword });
      expect(mockUsuarioModel.findOne).toHaveBeenCalledWith({ email });
      expect(mockUsuarioModel.create).toHaveBeenCalledWith({
        email,
        password: hashedPassword,
      });
    });

    it('debería lanzar un conflicto si el usuario ya existe', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      mockUsuarioModel.findOne.mockResolvedValue({ email }); // Simula que el usuario ya existe

      await expect(service.registrar(email, password)).rejects.toThrow(
        ConflictException,
      );
      expect(mockUsuarioModel.findOne).toHaveBeenCalledWith({ email });
      expect(mockUsuarioModel.create).not.toHaveBeenCalled();
    });
  });

  describe('encontrarPorEmail', () => {
    it('debería retornar un usuario si existe', async () => {
      const email = 'test@example.com';
      const usuario = { email, password: 'hashedPassword' };

      mockUsuarioModel.findOne.mockResolvedValue(usuario); // Simula que el usuario existe

      const result = await service.encontrarPorEmail(email);
      expect(result).toEqual(usuario);
      expect(mockUsuarioModel.findOne).toHaveBeenCalledWith({ email });
    });

    it('debería retornar null si el usuario no existe', async () => {
      const email = 'nonexistent@example.com';

      mockUsuarioModel.findOne.mockResolvedValue(null); // Simula que el usuario no existe

      const result = await service.encontrarPorEmail(email);
      expect(result).toBeNull();
      expect(mockUsuarioModel.findOne).toHaveBeenCalledWith({ email });
    });
  });
});
