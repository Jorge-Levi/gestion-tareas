import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Describe el bloque de pruebas para AppController
describe('AppController', () => {
  let appController: AppController;

  // Configura el entorno de prueba antes de cada prueba
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // Inyecta el controlador a probar
      providers: [AppService], // Inyecta el servicio necesario
    }).compile();

    appController = app.get<AppController>(AppController); // Obtén una instancia del controlador
  });

  // Describe un conjunto específico de pruebas
  describe('root', () => {
    it('should return "Hello World!"', () => {
      // Asegúrate de que el método getHello() del controlador devuelva "Hello World!"
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
