'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('usuarios', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			nombre: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			clave: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			usuario: {
				type: Sequelize.STRING(15),
				allowNull: false,
				unique: true,
			},
			rol: {
				type: Sequelize.BOOLEAN,
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
		await queryInterface.dropTable('usuarios');
	},
};
