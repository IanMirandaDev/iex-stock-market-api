/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

const { create } = require('express-handlebars');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('companies', {
			id: {
				type: Sequelize.DataTypes.INTEGER(11),
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
				unique: true
			},
			companyName: {
				type: Sequelize.DataTypes.STRING(255),
				unique: true
			},
			symbol: {
				type: Sequelize.DataTypes.STRING(255),
				unique: true
			},
			industry: Sequelize.DataTypes.STRING(255),
			website: Sequelize.DataTypes.STRING(255),
			employees: Sequelize.DataTypes.INTEGER(11),
			description: Sequelize.DataTypes.TEXT,
			lastUpdate: { 
				type: Sequelize.DataTypes.DATE,
				defaultValue: Sequelize.DataTypes.NOW,
				allowNull: false
			},
			createdAt: {
				type: Sequelize.DataTypes.DATE,
				allowNull: false
			},
			updatedAt: {
				type: Sequelize.DataTypes.DATE,
				allowNull: false
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		queryInterface.dropTable('companies');
	}
};
