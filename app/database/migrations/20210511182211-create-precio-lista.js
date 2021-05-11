'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('preciolistas', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			descripcion: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			estado: {
				type: Sequelize.STRING(15),
				allowNull: false,
			},
			EmpresaId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'empresas', key: 'id' },
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
		await queryInterface.dropTable('preciolistas');
	},
};
