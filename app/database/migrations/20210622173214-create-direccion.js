'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Direccions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      calle: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.INTEGER
      },
      piso: {
        type: Sequelize.INTEGER
      },
      depto: {
        type: Sequelize.INTEGER
      },
      barrio: {
        type: Sequelize.STRING
      },
      ciudad: {
        type: Sequelize.STRING
      },
      provincia: {
        type: Sequelize.STRING
      },
      cp: {
        type: Sequelize.INTEGER
      },
      referencia: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Direccions');
  }
};