'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('precios', {
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
			},
			pu: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			PrecioListaId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'preciolistas', key: 'id' },
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('precios');
	},
};
