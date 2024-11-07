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
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearTareaDto, ActualizarTareaDto } from './tarea.dto'; // Asegúrate de tener los DTOs creados

/**
 * Controlador para manejar las operaciones relacionadas con las tareas.
 */
@ApiTags('tareas') // Agrupa los endpoints bajo la etiqueta 'tareas' en la documentación
@ApiBearerAuth() // Indica que se requiere autenticación Bearer para todos los endpoints
@Controller('api/tareas')
@UseGuards(AuthGuard('jwt')) // Protege todos los endpoints del controlador
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  /**
   * Crea una nueva tarea.
   * @param tareaDto - Objeto que contiene los datos de la tarea a crear.
   * @returns La tarea creada.
   */
  @Post()
  @ApiResponse({ status: 201, description: 'Tarea creada correctamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  async crearTarea(@Body() tareaDto: CrearTareaDto): Promise<Tarea> {
    return this.tareasService.crearTarea(tareaDto);
  }

  /**
   * Lista todas las tareas, con paginación.
   * @param pagina - Número de la página a recuperar (por defecto es 1).
   * @param limite - Número de tareas por página (por defecto es 10).
   * @returns Lista de tareas.
   */
  @Get()
  @ApiResponse({ status: 200, description: 'Lista de tareas.' })
  @ApiResponse({ status: 204, description: 'No hay tareas disponibles.' })
  async listarTareas(
    @Query('pagina') pagina = 1,
    @Query('limite') limite = 10,
  ): Promise<Tarea[]> {
    return this.tareasService.listarTareas(pagina, limite);
  }

  /**
   * Obtiene una tarea específica por ID.
   * @param id - ID de la tarea a recuperar.
   * @returns La tarea encontrada.
   */
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Tarea encontrada.' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada.' })
  async obtenerTarea(@Param('id') id: string): Promise<Tarea> {
    return this.tareasService.obtenerTareaPorId(id);
  }

  /**
   * Actualiza una tarea existente.
   * @param id - ID de la tarea a actualizar.
   * @param tareaDto - Objeto que contiene los nuevos datos de la tarea.
   * @returns La tarea actualizada.
   */
  @Put(':id')
  @ApiResponse({ status: 200, description: 'Tarea actualizada.' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  async actualizarTarea(
    @Param('id') id: string,
    @Body() tareaDto: ActualizarTareaDto,
  ): Promise<Tarea> {
    return this.tareasService.actualizarTarea(id, tareaDto);
  }

  /**
   * Elimina una tarea por ID.
   * @param id - ID de la tarea a eliminar.
   * @returns Un objeto vacío si la eliminación fue exitosa.
   */
  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Tarea eliminada.' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada.' })
  async eliminarTarea(@Param('id') id: string): Promise<void> {
    await this.tareasService.eliminarTarea(id);
  }
}
