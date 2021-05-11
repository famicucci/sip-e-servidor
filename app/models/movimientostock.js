'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class MovimientoStock extends Model {
		static associate(models) {
			MovimientoStock.belongsTo(models.Producto);
			MovimientoStock.belongsTo(models.PtoStock);
			MovimientoStock.belongsTo(models.Usuario);
		}
	}
	MovimientoStock.init(
		{
			ProductoCodigo: DataTypes.STRING(15),
			cantidad: DataTypes.INTEGER,
			PtoStockId: DataTypes.INTEGER,
			UsuarioId: DataTypes.INTEGER,
			motivo: DataTypes.STRING(30),
		},
		{
			sequelize,
			modelName: 'MovimientoStock',
		}
	);
	return MovimientoStock;
};
