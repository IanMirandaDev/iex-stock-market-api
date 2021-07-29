'use strict';

const { create } = require("express-handlebars");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('companies', {
            id: {
                type: Sequelize.DataTypes.INTEGER(11),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
			companyName: Sequelize.DataTypes.STRING(255),
			symbol: Sequelize.DataTypes.STRING(255),
			industry: Sequelize.DataTypes.STRING(255),
			website: Sequelize.DataTypes.STRING(255),
			employees: Sequelize.DataTypes.INTEGER(11),
			description: Sequelize.DataTypes.TEXT,
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