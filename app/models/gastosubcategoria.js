'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class GastoSubcategoria extends Model {
		static associate(models) {
			GastoSubcategoria.belongsTo(models.GastoCategoria, {
				foreignKey: { allowNull: false },
				onDelete: 'RESTRICT',
				onUpdate: 'RESTRICT',
			});
		}
	}
	GastoSubcategoria.init(
		{
			descripcion: { type: DataTypes.STRING(30), allowNull: false },
		},
		{
			sequelize,
			modelName: 'GastoSubcategoria',
			timestamps: false,
		}
	);
	return GastoSubcategoria;
};