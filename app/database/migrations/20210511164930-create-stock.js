'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('stocks', {
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
			cantidad: {
				type: Sequelize.INTEGER,
			},
			PtoStockId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'ptostocks', key: 'id' },
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('stocks');
	},
};
