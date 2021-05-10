'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Empresa extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Empresa.init(
		{
			nombre: { type: DataTypes.STRING(30), allowNull: false },
		},
		{
			sequelize,
			modelName: 'Empresa',
			timestamps: false,
		}
	);
	return Empresa;
};
