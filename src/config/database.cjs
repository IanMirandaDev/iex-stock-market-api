/* eslint-disable no-undef */
require('dotenv').config();
const process = require('process');

const databaseConfig = {
	'development': {
		'database': process.env.DB_DATABASE_DEV,
		'username': process.env.DB_USER_DEV,
		'password': process.env.DB_PASS_DEV,
		'host': process.env.DB_HOST_DEV,
		'port': process.env.DB_PORT_DEV,
		'dialect': 'mysql',
        'logging': false
	},
	'production': {
		'database': process.env.DB_DATABASE_PROD,
		'username': process.env.DB_USER_PROD,
		'password': process.env.DB_PASS_PROD,
		'host': process.env.DB_HOST_PROD,
		'port': process.env.DB_PORT_PROD,
		'dialect': 'mysql',
        'logging': false
	},
};

module.exports = databaseConfig;