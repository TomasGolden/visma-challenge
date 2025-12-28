'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * CREAR TABLA USERS
     * Requisito: id, name, email
     */
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
      // Nota: No agregamos created_at/updated_at aquí porque el modelo User
      // lo definimos con timestamps: false, aunque es buena práctica tenerlos.
    });

    /**
     * CREAR TABLA TASKS
     * Requisito: id, title, description, assigned_user_id, status, created_at
     */
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING, // Usamos String para simplificar en DB, en código validamos ENUM
        defaultValue: 'pending'
      },
      assigned_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Nombre de la tabla a la que referencia
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    // El orden importa al borrar: primero tasks (que tiene la FK), luego users
    await queryInterface.dropTable('tasks');
    await queryInterface.dropTable('users');
  }
};