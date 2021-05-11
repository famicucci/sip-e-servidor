'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let precioListas = [
			{ descripcion: 'Lista Minorista', estado: 'Vigente', EmpresaId: '1' },
			{ descripcion: 'Lista Mayorista', estado: 'Vigente', EmpresaId: '1' },
			{ descripcion: 'Lista Minorista', estado: 'Vigente', EmpresaId: '2' },
			{ descripcion: 'Lista Mayorista', estado: 'No vigente', EmpresaId: '2' },
		];
		await queryInterface.bulkInsert('preciolistas', precioListas, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('preciolistas', null, {});
	},
};
