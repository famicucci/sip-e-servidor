'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class PrecioLista extends Model {
		static associate(models) {
			PrecioLista.belongsTo(models.Empresa);
		}
	}
	PrecioLista.init(
		{
			descripcion: DataTypes.STRING(30),
			estado: DataTypes.STRING(15),
			EmpresaId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'PrecioLista',
		}
	);
	return PrecioLista;
};
