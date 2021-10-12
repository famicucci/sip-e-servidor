'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let subcategoriasGasto = [
			{
				descripcion: 'Sueldos',
				GastoCategoriaId: '1',
			},
			{
				descripcion: 'Pago Extra',
				GastoCategoriaId: '1',
			},
			{
				descripcion: 'Serv. Profesionales',
				GastoCategoriaId: '1',
			},
			{
				descripcion: 'Telas',
				GastoCategoriaId: '2',
			},
			{
				descripcion: 'Otros',
				GastoCategoriaId: '2',
			},
			{
				descripcion: 'Flete',
				GastoCategoriaId: '4',
			},
			{
				descripcion: 'PUDO',
				GastoCategoriaId: '4',
			},
			{
				descripcion: 'Insumos de Oficina',
				GastoCategoriaId: '3',
			},
			{
				descripcion: 'Otros',
				GastoCategoriaId: '3',
			},
			{
				descripcion: 'Google Ads',
				GastoCategoriaId: '6',
			},
			{
				descripcion: 'Facebook',
				GastoCategoriaId: '6',
			},
			{
				descripcion: 'Otros',
				GastoCategoriaId: '5',
			},
		];
		await queryInterface.bulkInsert(
			'gastosubcategoria',
			subcategoriasGasto,
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('gastosubcategoria', null, {});
	},
};
