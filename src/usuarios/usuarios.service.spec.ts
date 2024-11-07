import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { getModelToken } from '@nestjs/mongoose';
import { Usuario } from './usuario.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { ConflictException } from '@nestjs/common';

// Mock para el modelo de Usuario
const mockUsuarioModel = {
  findOne: jest.fn(), // Simulación del método findOne
  create: jest.fn(), // Simulación del método create
};

describe('UsuariosService', () => {
  let service: UsuariosService;
  let model: Model<Usuario>;

  // Configuración antes de cada prueba
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: getModelToken(Usuario.name), // Proporciona el modelo simulado
          useValue: mockUsuarioModel,
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService); // Obtiene la instancia del servicio
    model = module.get<Model<Usuario>>(getModelToken(Usuario.name)); // Obtiene el modelo simulado
  });

  // Limpia los mocks después de cada prueba
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Grupo de pruebas para el método registrar
  describe('registrar', () => {
    it('debería registrar un nuevo usuario', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña

      mockUsuarioModel.findOne.mockResolvedValue(null); // Simula que el usuario no existe
      mockUsuarioModel.create.mockResolvedValue({
        email,
        password: hashedPassword,
      });

      const result = await service.registrar(email, password); // Llama al método registrar
      expect(result).toEqual({ email, password: hashedPassword }); // Verifica el resultado
      expect(mockUsuarioModel.findOne).toHaveBeenCalledWith({ email }); // Verifica la llamada a findOne
      expect(mockUsuarioModel.create).toHaveBeenCalledWith({
        email,
        password: hashedPassword,
      }); // Verifica la llamada a create
    });

    it('debería lanzar un conflicto si el usuario ya existe', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      mockUsuarioModel.findOne.mockResolvedValue({ email }); // Simula que el usuario ya existe

      await expect(service.registrar(email, password)).rejects.toThrow(
        ConflictException, // Verifica que se lance ConflictException
      );
      expect(mockUsuarioModel.findOne).toHaveBeenCalledWith({ email });
      expect(mockUsuarioModel.create).not.toHaveBeenCalled(); // Verifica que no se llame a create
    });
  });

  // Grupo de pruebas para el método encontrarPorEmail
  describe('encontrarPorEmail', () => {
    it('debería retornar un usuario si existe', async () => {
      const email = 'test@example.com';
      const usuario = { email, password: 'hashedPassword' };

      mockUsuarioModel.findOne.mockResolvedValue(usuario); // Simula que el usuario existe

      const result = await service.encontrarPorEmail(email);
      expect(result).toEqual(usuario); // Verifica el resultado
      expect(mockUsuarioModel.findOne).toHaveBeenCalledWith({ email }); // Verifica la llamada a findOne
    });

    it('debería retornar null si el usuario no existe', async () => {
      const email = 'nonexistent@example.com';

      mockUsuarioModel.findOne.mockResolvedValue(null); // Simula que el usuario no existe

      const result = await service.encontrarPorEmail(email);
      expect(result).toBeNull(); // Verifica que el resultado sea null
      expect(mockUsuarioModel.findOne).toHaveBeenCalledWith({ email }); // Verifica la llamada a findOne
    });
  });
});
