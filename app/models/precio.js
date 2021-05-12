'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Precio extends Model {
		static associate(models) {
			Precio.belongsTo(models.ListaPrecio);
			Precio.belongsTo(models.Producto);
		}
	}
	Precio.init(
		{
			ProductoCodigo: DataTypes.STRING(15),
			pu: DataTypes.DECIMAL(10, 2),
			ListaPrecioId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Precio',
		}
	);
	return Precio;
};
