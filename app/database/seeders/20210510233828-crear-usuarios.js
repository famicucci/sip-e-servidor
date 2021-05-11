'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let usuarios = [
			{
				nombre: 'Francisco Agustín Micucci',
				clave: '123456',
				usuario: 'famicucci',
				rol: 1,
				EmpresaId: 1,
			},
			{
				nombre: 'Camila Di Giacomo',
				clave: '123456',
				usuario: 'cdigiacomo',
				rol: 1,
				EmpresaId: 1,
			},
			{
				nombre: 'Yazmín Juarez',
				clave: '123456',
				usuario: 'yjuarez',
				rol: 1,
				EmpresaId: 1,
			},
		];
		await queryInterface.bulkInsert('usuarios', usuarios, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('usuarios', null, {});
	},
};
