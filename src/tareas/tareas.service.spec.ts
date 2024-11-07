import { Test, TestingModule } from '@nestjs/testing';
import { TareasService } from './tareas.service';
import { getModelToken } from '@nestjs/mongoose';
import { Tarea } from './tarea.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

const mockTareaModel = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('TareasService', () => {
  let service: TareasService;
  let model: Model<Tarea>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TareasService,
        {
          provide: getModelToken(Tarea.name),
          useValue: mockTareaModel,
        },
      ],
    }).compile();

    service = module.get<TareasService>(TareasService);
    model = module.get<Model<Tarea>>(getModelToken(Tarea.name));
  });

  describe('crearTarea', () => {
    it('debería crear una nueva tarea', async () => {
      const tareaDto = {
        titulo: 'Tarea 1',
        descripcion: 'Descripción',
        fechaVencimiento: new Date(),
      };
      mockTareaModel.create = jest.fn().mockResolvedValue(tareaDto);

      const tarea = await service.crearTarea(tareaDto);
      expect(tarea).toEqual(tareaDto);
      expect(mockTareaModel.create).toHaveBeenCalledWith(tareaDto);
    });
  });

  describe('listarTareas', () => {
    it('debería listar todas las tareas', async () => {
      const tareasArray = [
        {
          titulo: 'Tarea 1',
          descripcion: 'Descripción 1',
          fechaVencimiento: new Date(),
        },
        {
          titulo: 'Tarea 2',
          descripcion: 'Descripción 2',
          fechaVencimiento: new Date(),
        },
      ];
      mockTareaModel.find = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(tareasArray),
        }),
      });

      const tareas = await service.listarTareas(1, 10);
      expect(tareas).toEqual(tareasArray);
      expect(mockTareaModel.find).toHaveBeenCalled();
    });
  });

  describe('obtenerTareaPorId', () => {
    it('debería devolver una tarea existente', async () => {
      const tareaDto = {
        id: '1',
        titulo: 'Tarea 1',
        descripcion: 'Descripción',
        fechaVencimiento: new Date(),
      };
      mockTareaModel.findById = jest.fn().mockResolvedValue(tareaDto);

      const tarea = await service.obtenerTareaPorId('1');
      expect(tarea).toEqual(tareaDto);
      expect(mockTareaModel.findById).toHaveBeenCalledWith('1');
    });

    it('debería lanzar NotFoundException si la tarea no existe', async () => {
      mockTareaModel.findById = jest.fn().mockResolvedValue(null);

      await expect(service.obtenerTareaPorId('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('actualizarTarea', () => {
    it('debería actualizar una tarea existente', async () => {
      const tareaDto = {
        id: '1',
        titulo: 'Tarea 1',
        descripcion: 'Descripción',
        fechaVencimiento: new Date(),
      };
      mockTareaModel.findByIdAndUpdate = jest.fn().mockResolvedValue(tareaDto);

      const tarea = await service.actualizarTarea('1', tareaDto);
      expect(tarea).toEqual(tareaDto);
      expect(mockTareaModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        tareaDto,
        { new: true },
      );
    });

    it('debería lanzar NotFoundException si la tarea no existe', async () => {
      mockTareaModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await expect(service.actualizarTarea('1', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('eliminarTarea', () => {
    it('debería eliminar una tarea existente', async () => {
      const tareaDto = {
        id: '1',
        titulo: 'Tarea 1',
        descripcion: 'Descripción',
        fechaVencimiento: new Date(),
      };
      mockTareaModel.findByIdAndDelete = jest.fn().mockResolvedValue(tareaDto);

      const tarea = await service.eliminarTarea('1');
      expect(tarea).toEqual(tareaDto);
      expect(mockTareaModel.findByIdAndDelete).toHaveBeenCalledWith('1');
    });

    it('debería lanzar NotFoundException si la tarea no existe', async () => {
      mockTareaModel.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await expect(service.eliminarTarea('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
