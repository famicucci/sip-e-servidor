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
db.Empresa = require('../models/empresa')(db.connection, DataTypes);

module.exports = db;
