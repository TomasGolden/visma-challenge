'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Crear Usuarios (Ahora son 5 y tienen fechas)
    await queryInterface.bulkInsert('users', [
      {
        name: 'Juan Pérez',
        email: 'juan@visma.com',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Maria Garcia',
        email: 'maria@visma.com',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Carlos López',
        email: 'carlos@visma.com',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Ana Torres',
        email: 'ana@visma.com',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Luisa Fernández',
        email: 'luisa@visma.com',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

    // 2. Crear Tareas Iniciales
    // Asigno tareas a los usuarios 1, 2 y 3 para probar
    await queryInterface.bulkInsert('tasks', [
      {
        title: 'Completar desafío técnico',
        description: 'Terminar el backend en NestJS y el frontend en Angular',
        status: 'pending',
        assigned_user_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Revisar documentación',
        description: 'Leer los requisitos de Visma',
        status: 'completed',
        assigned_user_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Preparar presentación',
        description: 'Crear slides para la demo',
        status: 'pending',
        assigned_user_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};