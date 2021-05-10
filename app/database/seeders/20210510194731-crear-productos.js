'use strict';

module.exports = {
	// se ejecuta cuando hacemos la siembra
	up: async (queryInterface, Sequelize) => {
		let productos = [
			{
				codigo: 'PJ100027LM',
				descripcion: 'Pantalon joggin - lineas horizontales - m - marrón',
				EmpresaId: 1,
			},
			{
				codigo: 'PJ100022LM',
				descripcion: 'Pantalon joggin - lineas verticales - m - gris',
				EmpresaId: 1,
			},
			{
				codigo: 'RA100031LM',
				descripcion: 'Remera algodón - basketball - s - negro',
				EmpresaId: 1,
			},
		];

		await queryInterface.bulkInsert('productos', productos, {});
	},

	// se ejecuta cuando se deshace la siembra
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Producto', null, {});
	},
};
