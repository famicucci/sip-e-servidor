'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let empresas = [
			{
				nombre: 'Santas Sport',
			},
			{
				nombre: 'Pepa Pets',
			},
		];
		await queryInterface.bulkInsert('empresas', empresas, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('empresas', null, {});
	},
};
