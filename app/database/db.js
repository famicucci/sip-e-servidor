const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config/database');
const db = {};

db.connection = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

// vinculo a modelos
db.Empresa = require('../models/Empresa')(db.connection, DataTypes);
db.Producto = require('../models/Producto')(db.connection, DataTypes);

module.exports = db;