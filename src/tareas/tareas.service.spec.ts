import { Test, TestingModule } from '@nestjs/testing';
import { TareasService } from './tareas.service';
import { getModelToken } from '@nestjs/mongoose';
import { Tarea } from './tarea.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

// Simulación del modelo de Mongoose para las tareas
const mockTareaModel = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

// Grupo de pruebas para el servicio de tareas
describe('TareasService', () => {
  let service: TareasService;
  let model: Model<Tarea>;

  // Configuración del módulo antes de cada prueba
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

  // Pruebas para el método crearTarea
  describe('crearTarea', () => {
    it('debería crear una nueva tarea', async () => {
      const tareaDto = {
        titulo: 'Tarea 1',
        descripcion: 'Descripción',
        fechaVencimiento: new Date(),
      };
      mockTareaModel.create.mockResolvedValue(tareaDto); // Simulación del método create

      const tarea = await service.crearTarea(tareaDto);
      expect(tarea).toEqual(tareaDto); // Verifica que la tarea devuelta sea la esperada
      expect(mockTareaModel.create).toHaveBeenCalledWith(tareaDto); // Verifica que se haya llamado con los parámetros correctos
    });
  });

  // Pruebas para el método listarTareas
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
      mockTareaModel.find.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(tareasArray), // Simulación de la paginación
        }),
      });

      const tareas = await service.listarTareas(1, 10);
      expect(tareas).toEqual(tareasArray); // Verifica que se devuelva la lista de tareas
      expect(mockTareaModel.find).toHaveBeenCalled(); // Verifica que se haya llamado al método find
    });
  });

  // Pruebas para el método obtenerTareaPorId
  describe('obtenerTareaPorId', () => {
    it('debería devolver una tarea existente', async () => {
      const tareaDto = {
        id: '1',
        titulo: 'Tarea 1',
        descripcion: 'Descripción',
        fechaVencimiento: new Date(),
      };
      mockTareaModel.findById.mockResolvedValue(tareaDto); // Simulación del método findById

      const tarea = await service.obtenerTareaPorId('1');
      expect(tarea).toEqual(tareaDto); // Verifica que la tarea devuelta sea la esperada
      expect(mockTareaModel.findById).toHaveBeenCalledWith('1'); // Verifica que se haya llamado con el ID correcto
    });

    it('debería lanzar NotFoundException si la tarea no existe', async () => {
      mockTareaModel.findById.mockResolvedValue(null); // Simulación de un resultado nulo

      await expect(service.obtenerTareaPorId('1')).rejects.toThrow(
        NotFoundException, // Verifica que se lance la excepción adecuada
      );
    });
  });

  // Pruebas para el método actualizarTarea
  describe('actualizarTarea', () => {
    it('debería actualizar una tarea existente', async () => {
      const tareaDto = {
        id: '1',
        titulo: 'Tarea 1',
        descripcion: 'Descripción',
        fechaVencimiento: new Date(),
      };
      mockTareaModel.findByIdAndUpdate.mockResolvedValue(tareaDto); // Simulación del método findByIdAndUpdate

      const tarea = await service.actualizarTarea('1', tareaDto);
      expect(tarea).toEqual(tareaDto); // Verifica que la tarea devuelta sea la esperada
      expect(mockTareaModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        tareaDto,
        { new: true }, // Verifica que el parámetro { new: true } esté presente
      );
    });

    it('debería lanzar NotFoundException si la tarea no existe', async () => {
      mockTareaModel.findByIdAndUpdate.mockResolvedValue(null); // Simulación de un resultado nulo

      await expect(service.actualizarTarea('1', {})).rejects.toThrow(
        NotFoundException, // Verifica que se lance la excepción adecuada
      );
    });
  });

  // Pruebas para el método eliminarTarea
  describe('eliminarTarea', () => {
    it('debería eliminar una tarea existente', async () => {
      const tareaDto = {
        id: '1',
        titulo: 'Tarea 1',
        descripcion: 'Descripción',
        fechaVencimiento: new Date(),
      };
      mockTareaModel.findByIdAndDelete.mockResolvedValue(tareaDto); // Simulación del método findByIdAndDelete

      const tarea = await service.eliminarTarea('1');
      expect(tarea).toEqual(tareaDto); // Verifica que la tarea devuelta sea la esperada
      expect(mockTareaModel.findByIdAndDelete).toHaveBeenCalledWith('1'); // Verifica que se haya llamado con el ID correcto
    });

    it('debería lanzar NotFoundException si la tarea no existe', async () => {
      mockTareaModel.findByIdAndDelete.mockResolvedValue(null); // Simulación de un resultado nulo

      await expect(service.eliminarTarea('1')).rejects.toThrow(
        NotFoundException, // Verifica que se lance la excepción adecuada
      );
    });
  });
});
