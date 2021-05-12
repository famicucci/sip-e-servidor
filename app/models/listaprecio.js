'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class ListaPrecio extends Model {
		static associate(models) {
			ListaPrecio.belongsTo(models.Empresa);
			ListaPrecio.hasMany(models.Precio);
		}
	}
	ListaPrecio.init(
		{
			descripcion: DataTypes.STRING(30),
			estado: DataTypes.STRING(15),
			EmpresaId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'ListaPrecio',
		}
	);
	return ListaPrecio;
};
