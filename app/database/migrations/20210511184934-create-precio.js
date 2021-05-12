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
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			pu: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			ListaPrecioId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'listaprecios', key: 'id' },
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
