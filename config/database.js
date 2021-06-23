require('dotenv').config();

module.exports = {
	username: process.env.DB_USERNAME || 'root',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_DATABASE || 'sip-e2',
	host: process.env.DB_HOST || 'localhost',
	dialect: process.env.DB_DIALECT || 'mysql',

	define: {
		freezeTableName: true,
	},

	// configurar seeds
	seederStorage: 'json',
	seederStoragePath: 'sequelizeSeed.json',

	// Configurar migraciones
	migrationStorage: 'sequelize',
	migrationStorageName: 'migrations',
};
