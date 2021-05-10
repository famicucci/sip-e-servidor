'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Producto extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Producto.belongsTo(models.Empresa);
		}
	}
	Producto.init(
		{
			codigo: { type: DataTypes.STRING(15), allowNull: false, unique: true },
			descripcion: { type: DataTypes.STRING(120), allowNull: false },
		},
		{
			sequelize,
			modelName: 'Producto',
		}
	);
	return Producto;
};
