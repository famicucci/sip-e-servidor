'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class PtoStock extends Model {
		static associate(models) {
			PtoStock.belongsTo(models.Empresa);
			PtoStock.hasMany(models.Stock, { foreignKey: { allowNull: false } });
			PtoStock.hasMany(models.MovimientoStock, {
				foreignKey: { allowNull: false },
			});
		}
	}
	PtoStock.init(
		{
			descripcion: DataTypes.STRING(30),
			stockMin: DataTypes.INTEGER,
			EmpresaId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'PtoStock',
		}
	);
	return PtoStock;
};