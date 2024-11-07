import { Controller, Get } from '@nestjs/common';

/**
 * Controlador principal de la aplicación.
 * Maneja las solicitudes en la raíz de la aplicación.
 */
@Controller()
export class AppController {
  /**
   * Maneja las solicitudes GET a la ruta raíz ('/').
   * @returns {string} Mensaje de saludo.
   */
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
