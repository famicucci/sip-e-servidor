'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('gastosubcategoria', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			descripcion: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			GastoCategoriaId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'gastocategoria', key: 'id' },
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('gastosubcategoria');
	},
};
