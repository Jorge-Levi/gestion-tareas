# Gestión de Tareas API

Esta es una API RESTful para gestionar tareas, construida con NestJS y MongoDB. La API permite a los usuarios crear, leer, actualizar y eliminar tareas, así como gestionar la autenticación de usuarios mediante JWT.

## Tabla de Contenidos

1. Características
2. Tecnologías Utilizadas
3. Instalación
4. Configuración
5. Uso
6. Endpoints
7. Pruebas
8. Documentación de API
9. Contribuciones
10. Licencia

## Características

* Crear, leer, actualizar y eliminar tareas.
* Autenticación de usuarios utilizando JWT.
* Validación de datos y manejo de errores.
* Documentación de la API generada automáticamente con Swagger.

## Tecnologías Utilizadas

* NestJS
* MongoDB
* TypeScript
* JWT
* Swagger

## Instalación

1. Clona el repositorio:
   git clone [https://github.com/tu_usuario/gestion-tareas.git](https://github.com/tu_usuario/gestion-tareas.git)
2. Navega al directorio del proyecto:
   cd gestion-tareas
3. Instala las dependencias:
   npm install

## Configuración

1. Asegúrate de tener MongoDB instalado y en funcionamiento en tu máquina.
2. Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:
   MONGODB_URI=mongodb://localhost/gestion-tareas
   (Ajusta la URI según sea necesario para tu configuración de MongoDB).

## Uso

1. Ejecuta la aplicación:
   npm run start
2. Accede a la documentación de la API en [http://localhost:3000/api](http://localhost:3000/api).
3. Para realizar pruebas en la API, puedes usar herramientas como Postman o Insomnia.

## Endpoints

### Tareas

* POST /api/tareas: Crear una nueva tarea.
* GET /api/tareas: Listar todas las tareas (soporta paginación).
* GET /api/tareas/🆔 Obtener una tarea específica.
* PUT /api/tareas/🆔 Actualizar una tarea existente.
* DELETE /api/tareas/🆔 Eliminar una tarea.

### Autenticación

* POST /api/registro: Registrar un nuevo usuario (requiere email y password).
* POST /api/login: Iniciar sesión y obtener un token JWT.

## Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

npm run test

Las pruebas incluyen tanto pruebas unitarias como de integración para los controladores y servicios de la API.

## Documentación de API

La documentación de la API está disponible en Swagger. Puedes acceder a ella en [http://localhost:3000/api](http://localhost:3000/api). Aquí encontrarás información detallada sobre los endpoints, parámetros, respuestas y ejemplos de uso.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature/nueva-caracteristica).
3. Realiza tus cambios y haz un commit (git commit -m 'Añadir nueva característica').
4. Envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.
