'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('movimientostocks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			ProductoCodigo: {
				type: Sequelize.STRING(15),
				allowNull: false,
				references: { model: 'productos', key: 'codigo' },
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			cantidad: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			PtoStockId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'ptostocks', key: 'id' },
			},
			UsuarioId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			motivo: {
				type: Sequelize.STRING(30),
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('movimientostocks');
	},
};
