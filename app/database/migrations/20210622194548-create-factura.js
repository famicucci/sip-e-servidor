'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Facturas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nroFactura: {
        type: Sequelize.STRING
      },
      observaciones: {
        type: Sequelize.STRING
      },
      estadoPago: {
        type: Sequelize.STRING
      },
      importe: {
        type: Sequelize.DECIMAL
      },
      descuento: {
        type: Sequelize.DECIMAL
      },
      tarifaEnvio: {
        type: Sequelize.DECIMAL
      },
      importeFinal: {
        type: Sequelize.DECIMAL
      },
      tipo: {
        type: Sequelize.STRING
      },
      estado: {
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
    await queryInterface.dropTable('Facturas');
  }
};