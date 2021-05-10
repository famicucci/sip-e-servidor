'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Usuario extends Model {
		static associate(models) {
			Usuario.belongsTo(models.Empresa);
		}
	}
	Usuario.init(
		{
			nombre: DataTypes.STRING,
			clave: DataTypes.STRING,
			usuario: DataTypes.STRING,
			rol: DataTypes.BOOLEAN,
			EmpresaId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Usuario',
		}
	);
	return Usuario;
};
