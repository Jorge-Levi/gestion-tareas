import { Test, TestingModule } from '@nestjs/testing';
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';
import { NotFoundException } from '@nestjs/common';

// Mock del servicio de tareas
const mockTareasService = {
  crearTarea: jest.fn(),
  listarTareas: jest.fn(),
  obtenerTareaPorId: jest.fn(),
  actualizarTarea: jest.fn(),
  eliminarTarea: jest.fn(),
};

describe('TareasController', () => {
  let controller: TareasController;

  // Configuración del módulo de pruebas antes de cada test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TareasController],
      providers: [{ provide: TareasService, useValue: mockTareasService }],
    }).compile();

    // Obtener una instancia del controlador
    controller = module.get<TareasController>(TareasController);
  });

  // Pruebas para el método crearTarea
  describe('crearTarea', () => {
    it('debería crear una tarea y devolverla', async () => {
      const tareaDto = {
        titulo: 'Tarea 1',
        descripcion: 'Descripción',
        fechaVencimiento: new Date(),
      };

      // Simular la respuesta del servicio
      mockTareasService.crearTarea.mockResolvedValue(tareaDto);

      // Ejecutar el método y verificar el resultado
      const result = await controller.crearTarea(tareaDto);
      expect(result).toEqual(tareaDto);
      expect(mockTareasService.crearTarea).toHaveBeenCalledWith(tareaDto);
    });
  });

  // Pruebas para el método listarTareas
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

      // Simular la respuesta del servicio
      mockTareasService.listarTareas.mockResolvedValue(tareasArray);

      // Ejecutar el método y verificar el resultado
      const result = await controller.listarTareas(1, 10);
      expect(result).toEqual(tareasArray);
      expect(mockTareasService.listarTareas).toHaveBeenCalledWith(1, 10);
    });
  });

  // Pruebas para el método obtenerTarea
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

      // Simular la respuesta del servicio
      mockTareasService.obtenerTareaPorId.mockResolvedValue(tarea);

      // Ejecutar el método y verificar el resultado
      const result = await controller.obtenerTarea(tareaId);
      expect(result).toEqual(tarea);
      expect(mockTareasService.obtenerTareaPorId).toHaveBeenCalledWith(tareaId);
    });

    it('debería lanzar NotFoundException si la tarea no existe', async () => {
      const tareaId = '2';
      mockTareasService.obtenerTareaPorId.mockResolvedValue(null);

      // Verificar que se lance la excepción
      await expect(controller.obtenerTarea(tareaId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // Pruebas para el método actualizarTarea
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

      // Simular la respuesta del servicio
      mockTareasService.actualizarTarea.mockResolvedValue(tareaActualizada);

      // Ejecutar el método y verificar el resultado
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

      // Verificar que se lance la excepción
      await expect(
        controller.actualizarTarea(tareaId, tareaDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // Pruebas para el método eliminarTarea
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

      // Simular la respuesta del servicio
      mockTareasService.eliminarTarea.mockResolvedValue(tareaEliminada);

      // Ejecutar el método y verificar el resultado
      const result = await controller.eliminarTarea(tareaId);
      expect(result).toEqual(tareaEliminada);
      expect(mockTareasService.eliminarTarea).toHaveBeenCalledWith(tareaId);
    });

    it('debería lanzar NotFoundException si la tarea no existe', async () => {
      const tareaId = '2';
      mockTareasService.eliminarTarea.mockResolvedValue(null);

      // Verificar que se lance la excepción
      await expect(controller.eliminarTarea(tareaId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
