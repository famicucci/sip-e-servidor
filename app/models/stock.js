'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Stock extends Model {
		static associate(models) {
			Stock.belongsTo(models.PtoStock);
			Stock.belongsTo(models.Producto);
		}
	}
	Stock.init(
		{
			ProductoCodigo: DataTypes.STRING(15),
			cantidad: DataTypes.INTEGER,
			PtoStockId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Stock',
		}
	);
	return Stock;
};
