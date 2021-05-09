require('dotenv').config();

console.log(process.env.DB_DATABASE);

module.exports = {
	username: process.env.DB_USERNAME || 'root',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_DATABASE || 'sip-e2',
	host: process.env.DB_HOST || 'localhost',
	dialect: 'mysql',
};
