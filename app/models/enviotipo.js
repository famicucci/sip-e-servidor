'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class EnvioTipo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			EnvioTipo.hasMany(models.Orden, {
				foreignKey: { allowNull: false },
				onDelete: 'RESTRICT',
				onUpdate: 'RESTRICT',
			});
		}
	}
	EnvioTipo.init(
		{
			descripcion: { type: DataTypes.STRING(30), allowNull: false },
		},
		{
			sequelize,
			modelName: 'EnvioTipo',
		}
	);
	return EnvioTipo;
};
