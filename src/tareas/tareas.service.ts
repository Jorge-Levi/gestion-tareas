import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tarea } from './tarea.schema';

@Injectable()
export class TareasService {
  constructor(@InjectModel(Tarea.name) private tareaModel: Model<Tarea>) {}

  async crearTarea(tareaDto: Partial<Tarea>): Promise<Tarea> {
    const nuevaTarea = new this.tareaModel(tareaDto);
    return nuevaTarea.save();
  }

  async listarTareas(pagina: number, limite: number): Promise<Tarea[]> {
    return this.tareaModel
      .find()
      .skip((pagina - 1) * limite)
      .limit(limite)
      .exec();
  }

  async obtenerTareaPorId(id: string): Promise<Tarea> {
    const tarea = await this.tareaModel.findById(id);
    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return tarea;
  }

  async actualizarTarea(id: string, tareaDto: Partial<Tarea>): Promise<Tarea> {
    const tarea = await this.tareaModel.findByIdAndUpdate(id, tareaDto, {
      new: true,
    });
    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return tarea;
  }

  async eliminarTarea(id: string): Promise<Tarea> {
    const tarea = await this.tareaModel.findByIdAndDelete(id);
    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return tarea;
  }
}
