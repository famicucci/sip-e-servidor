'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class MetodoPago extends Model {
		static associate(models) {
			MetodoPago.belongsTo(models.Empresa, {
				foreignKey: { allowNull: false },
				onDelete: 'RESTRICT',
				onUpdate: 'RESTRICT',
			});
		}
	}
	MetodoPago.init(
		{
			descripcion: { type: DataTypes.STRING(30), allowNull: false },
		},
		{
			sequelize,
			modelName: 'MetodoPago',
			timestamps: false,
		}
	);
	return MetodoPago;
};
