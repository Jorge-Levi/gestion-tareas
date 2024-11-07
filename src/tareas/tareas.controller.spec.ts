import { Test, TestingModule } from '@nestjs/testing';
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';
import { Tarea } from './tarea.schema';
import { NotFoundException } from '@nestjs/common';

const mockTareasService = {
  crearTarea: jest.fn(),
  listarTareas: jest.fn(),
  obtenerTareaPorId: jest.fn(),
  actualizarTarea: jest.fn(),
  eliminarTarea: jest.fn(),
};

describe('TareasController', () => {
  let controller: TareasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TareasController],
      providers: [{ provide: TareasService, useValue: mockTareasService }],
    }).compile();

    controller = module.get<TareasController>(TareasController);
  });

  describe('crearTarea', () => {
    it('debería crear una tarea y devolverla', async () => {
      const tareaDto = {
        titulo: 'Tarea 1',
        descripcion: 'Descripción',
        fechaVencimiento: new Date(),
      };
      mockTareasService.crearTarea.mockResolvedValue(tareaDto);

      const result = await controller.crearTarea(tareaDto);
      expect(result).toEqual(tareaDto);
      expect(mockTareasService.crearTarea).toHaveBeenCalledWith(tareaDto);
    });
  });

  describe('listarTareas', () => {
    it('debería devolver una lista de tareas', async () => {
      const tareasArray = [
        {
          id: '1',
          titulo: 'Tarea 1',
          descripcion: 'Descripción 1',
          fechaVencimiento: new Date(),
          estado: 'pendiente',
        },
        {
          id: '2',
          titulo: 'Tarea 2',
          descripcion: 'Descripción 2',
          fechaVencimiento: new Date(),
          estado: 'completado',
        },
      ];
      mockTareasService.listarTareas.mockResolvedValue(tareasArray);

      const result = await controller.listarTareas(1, 10);
      expect(result).toEqual(tareasArray);
      expect(mockTareasService.listarTareas).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('obtenerTarea', () => {
    it('debería devolver una tarea específica', async () => {
      const tareaId = '1';
      const tarea = {
        id: tareaId,
        titulo: 'Tarea 1',
        descripcion: 'Descripción',
        fechaVencimiento: new Date(),
        estado: 'pendiente',
      };
      mockTareasService.obtenerTareaPorId.mockResolvedValue(tarea);

      const result = await controller.obtenerTarea(tareaId);
      expect(result).toEqual(tarea);
      expect(mockTareasService.obtenerTareaPorId).toHaveBeenCalledWith(tareaId);
    });

    it('debería lanzar NotFoundException si la tarea no existe', async () => {
      const tareaId = '2';
      mockTareasService.obtenerTareaPorId.mockResolvedValue(null);

      await expect(controller.obtenerTarea(tareaId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('actualizarTarea', () => {
    it('debería actualizar una tarea y devolverla', async () => {
      const tareaId = '1';
      const tareaDto = {
        titulo: 'Tarea Actualizada',
        descripcion: 'Descripción Actualizada',
      };
      const tareaActualizada = {
        id: tareaId,
        ...tareaDto,
        fechaVencimiento: new Date(),
        estado: 'pendiente',
      };
      mockTareasService.actualizarTarea.mockResolvedValue(tareaActualizada);

      const result = await controller.actualizarTarea(tareaId, tareaDto);
      expect(result).toEqual(tareaActualizada);
      expect(mockTareasService.actualizarTarea).toHaveBeenCalledWith(
        tareaId,
        tareaDto,
      );
    });

    it('debería lanzar NotFoundException si la tarea no existe', async () => {
      const tareaId = '2';
      const tareaDto = { titulo: 'Tarea Actualizada' };
      mockTareasService.actualizarTarea.mockResolvedValue(null);

      await expect(
        controller.actualizarTarea(tareaId, tareaDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('eliminarTarea', () => {
    it('debería eliminar una tarea y devolverla', async () => {
      const tareaId = '1';
      const tareaEliminada = {
        id: tareaId,
        titulo: 'Tarea 1',
        descripcion: 'Descripción',
        fechaVencimiento: new Date(),
        estado: 'pendiente',
      };
      mockTareasService.eliminarTarea.mockResolvedValue(tareaEliminada);

      const result = await controller.eliminarTarea(tareaId);
      expect(result).toEqual(tareaEliminada);
      expect(mockTareasService.eliminarTarea).toHaveBeenCalledWith(tareaId);
    });

    it('debería lanzar NotFoundException si la tarea no existe', async () => {
      const tareaId = '2';
      mockTareasService.eliminarTarea.mockResolvedValue(null);

      await expect(controller.eliminarTarea(tareaId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
