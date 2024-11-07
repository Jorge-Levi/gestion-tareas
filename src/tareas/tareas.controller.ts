import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TareasService } from './tareas.service';
import { Tarea } from './tarea.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/tareas')
@UseGuards(AuthGuard('jwt')) // Protege todos los endpoints del controlador
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  async crearTarea(@Body() tareaDto: Partial<Tarea>): Promise<Tarea> {
    return this.tareasService.crearTarea(tareaDto);
  }

  @Get()
  async listarTareas(
    @Query('pagina') pagina = 1,
    @Query('limite') limite = 10,
  ): Promise<Tarea[]> {
    return this.tareasService.listarTareas(pagina, limite);
  }

  @Get(':id')
  async obtenerTarea(@Param('id') id: string): Promise<Tarea> {
    return this.tareasService.obtenerTareaPorId(id);
  }

  @Put(':id')
  async actualizarTarea(
    @Param('id') id: string,
    @Body() tareaDto: Partial<Tarea>,
  ): Promise<Tarea> {
    return this.tareasService.actualizarTarea(id, tareaDto);
  }

  @Delete(':id')
  async eliminarTarea(@Param('id') id: string): Promise<Tarea> {
    return this.tareasService.eliminarTarea(id);
  }
}
