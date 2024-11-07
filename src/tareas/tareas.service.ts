import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tarea } from './tarea.schema';

/**
 * Servicio para manejar la lógica de negocio relacionada con las tareas.
 */
@Injectable()
export class TareasService {
  constructor(@InjectModel(Tarea.name) private tareaModel: Model<Tarea>) {}

  /**
   * Crea una nueva tarea en la base de datos.
   * @param tareaDto - Objeto que contiene los datos de la tarea a crear.
   * @returns La tarea creada.
   */
  async crearTarea(tareaDto: Partial<Tarea>): Promise<Tarea> {
    const nuevaTarea = new this.tareaModel(tareaDto);
    return nuevaTarea.save();
  }

  /**
   * Lista todas las tareas con paginación.
   * @param pagina - Número de la página a recuperar (por defecto 1).
   * @param limite - Número de tareas a mostrar por página (por defecto 10).
   * @returns Un arreglo de tareas.
   */
  async listarTareas(
    pagina: number = 1,
    limite: number = 10,
  ): Promise<Tarea[]> {
    return this.tareaModel
      .find()
      .skip((pagina - 1) * limite) // Salta los elementos de las páginas anteriores
      .limit(limite) // Limita la cantidad de tareas devueltas
      .exec();
  }

  /**
   * Obtiene una tarea específica por su ID.
   * @param id - ID de la tarea a recuperar.
   * @returns La tarea encontrada.
   * @throws NotFoundException si la tarea no existe.
   */
  async obtenerTareaPorId(id: string): Promise<Tarea> {
    const tarea = await this.tareaModel.findById(id);
    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return tarea;
  }

  /**
   * Actualiza una tarea existente.
   * @param id - ID de la tarea a actualizar.
   * @param tareaDto - Objeto que contiene los nuevos datos de la tarea.
   * @returns La tarea actualizada.
   * @throws NotFoundException si la tarea no existe.
   */
  async actualizarTarea(id: string, tareaDto: Partial<Tarea>): Promise<Tarea> {
    const tarea = await this.tareaModel.findByIdAndUpdate(id, tareaDto, {
      new: true, // Devuelve el documento actualizado
    });
    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return tarea;
  }

  /**
   * Elimina una tarea por su ID.
   * @param id - ID de la tarea a eliminar.
   * @returns La tarea eliminada.
   * @throws NotFoundException si la tarea no existe.
   */
  async eliminarTarea(id: string): Promise<Tarea> {
    const tarea = await this.tareaModel.findByIdAndDelete(id);
    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return tarea;
  }
}
