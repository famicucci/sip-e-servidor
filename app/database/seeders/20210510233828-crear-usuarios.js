'use strict';
const bcryptjs = require('bcryptjs');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let usuarios = [
			{
				nombre: 'Francisco Agustín Micucci',
				password: bcryptjs.hashSync('123456', 10),
				usuario: 'famicucci',
				rol: 1,
				EmpresaId: 1,
			},
			{
				nombre: 'Camila Di Giacomo',
				password: bcryptjs.hashSync('123456', 10),
				usuario: 'cdigiacomo',
				rol: 1,
				EmpresaId: 1,
			},
			{
				nombre: 'Yazmín Juarez',
				password: bcryptjs.hashSync('123456', 10),
				usuario: 'yjuarez',
				rol: 1,
				EmpresaId: 1,
			},
			{
				nombre: 'Jennifer Laurence',
				password: bcryptjs.hashSync('123456', 10),
				usuario: 'jlaurence',
				rol: 0,
				EmpresaId: 1,
			},
			{
				nombre: 'Agustín Verrando',
				password: bcryptjs.hashSync('123456', 10),
				usuario: 'averrando',
				rol: 0,
				EmpresaId: 1,
			},
		];
		await queryInterface.bulkInsert('usuarios', usuarios, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('usuarios', null, {});
	},
};
