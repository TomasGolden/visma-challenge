# Visma Challenge - Full Stack Task Manager

Aplicación Full Stack desarrollada para el desafío técnico de Visma. Se trata de un sistema de gestión de tareas con interfaz estilo Kanban, asignación de usuarios y filtrado avanzado, construido sobre una arquitectura robusta y escalable.

## Características Principales

- **Gestión de Usuarios:** Registro y visualización de usuarios.
- **Tablero Kanban:** Organización visual de tareas en columnas (Pendiente / Completada).
- **Gestión de Tareas:**
  - Creación de tareas con asignación de usuario.
  - **Filtros Avanzados:** Filtrado dinámico por Estado y/o Usuario asignado.
  - **Cambio de Estado:** Flujo bidireccional (Completar / Reabrir).
- **Interfaz Moderna:** UI responsiva integrada con **FontAwesome** para una mejor experiencia de usuario.
- **Base de Datos Relacional:** Modelo normalizado con relaciones `One-to-Many` (Users -> Tasks).

## Stack Tecnológico

### Backend
- **Framework:** [NestJS](https://nestjs.com/)
- **Lenguaje:** TypeScript
- **Base de Datos:** PostgreSQL
- **ORM:** Sequelize (con Migraciones y Seeders)
- **Validaciones:** DTOs y Pipes.

### Frontend
- **Framework:** [Angular](https://angular.io/) (Standalone Components)
- **Estilos:** CSS3 / Flexbox
- **Iconos:** FontAwesome (CDN)
- **Comunicación:** Servicios HTTP con Observables (RxJS).

---

## Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente.

### Prerrequisitos
- Node.js (v18 o superior)
- PostgreSQL instalado y corriendo.

### 1. Configuración del Backend

```bash
# En una terminal ejecutar lo siguiente:

cd backend

# Instalar dependencias
npm install

# Configurar Base de Datos
# Asegúrate de tener una base de datos creada llamada 'visma_todo' (o la que definas en tu config)
# Revisa backend/database/config.js para ajustar usuario/contraseña si es necesario.

# Ejecutar Migraciones y Seeders (Datos de prueba)
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# Iniciar el servidor
npm run start:dev

# En otra terminal distinta, si nos encontramos en la carpeta backend, ejecutar primero

cd ..

sino ejecutar

cd frontend

# Instalar dependencias
npm install

# Iniciar la aplicación
ng serve
