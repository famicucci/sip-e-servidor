'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Usuario extends Model {
		static associate(models) {
			Usuario.belongsTo(models.Empresa);
			Usuario.hasMany(models.MovimientoStock);
		}
	}
	Usuario.init(
		{
			nombre: DataTypes.STRING(50),
			password: DataTypes.STRING(150),
			usuario: DataTypes.STRING(15),
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
