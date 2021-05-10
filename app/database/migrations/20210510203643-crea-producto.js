'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('productos', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			codigo: { type: Sequelize.STRING(15), allowNull: false, unique: true },
			descripcion: { type: Sequelize.STRING(120), allowNull: false },
			EmpresaId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'empresas', key: 'id' },
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('productos');
	},
};
