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
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CrearTareaDto, ActualizarTareaDto } from './tarea.dto'; // Asegúrate de tener los DTOs creados

@ApiTags('tareas')
@Controller('api/tareas')
@UseGuards(AuthGuard('jwt')) // Protege todos los endpoints del controlador
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Tarea creada correctamente.' })
  async crearTarea(@Body() tareaDto: CrearTareaDto): Promise<Tarea> {
    return this.tareasService.crearTarea(tareaDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de tareas.' })
  async listarTareas(
    @Query('pagina') pagina = 1,
    @Query('limite') limite = 10,
  ): Promise<Tarea[]> {
    return this.tareasService.listarTareas(pagina, limite);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Tarea encontrada.' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada.' })
  async obtenerTarea(@Param('id') id: string): Promise<Tarea> {
    return this.tareasService.obtenerTareaPorId(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Tarea actualizada.' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada.' })
  async actualizarTarea(
    @Param('id') id: string,
    @Body() tareaDto: ActualizarTareaDto,
  ): Promise<Tarea> {
    return this.tareasService.actualizarTarea(id, tareaDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Tarea eliminada.' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada.' })
  async eliminarTarea(@Param('id') id: string): Promise<Tarea> {
    return this.tareasService.eliminarTarea(id);
  }
}
