'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Gasto extends Model {
		static associate(models) {
			Gasto.belongsTo(models.Usuario, {
				foreignKey: { allowNull: false },
				onDelete: 'RESTRICT',
				onUpdate: 'RESTRICT',
			});
			Gasto.belongsTo(models.GastoCategoria, {
				foreignKey: { allowNull: false },
				onDelete: 'RESTRICT',
				onUpdate: 'RESTRICT',
			});
			Gasto.belongsTo(models.GastoSubcategoria, {
				foreignKey: { allowNull: false },
				onDelete: 'RESTRICT',
				onUpdate: 'RESTRICT',
			});
		}
	}
	Gasto.init(
		{
			descripcion: { type: DataTypes.STRING(50), allowNull: false },
			estado: { type: DataTypes.STRING(15), allowNull: false },
			importe: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
		},
		{
			sequelize,
			modelName: 'Gasto',
		}
	);
	return Gasto;
};
