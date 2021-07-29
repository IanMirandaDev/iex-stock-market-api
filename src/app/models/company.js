import DataTypes from 'sequelize';
import Model from 'sequelize';
import sequelize from '../../database';

class Company extends Model {}

Company.init({
	companyName: DataTypes.STRING(255),
	symbol: DataTypes.STRING(255),
	industry: DataTypes.STRING(255),
	website: DataTypes.STRING(255),
	employees: DataTypes.INTEGER(11),
	description: DataTypes.TEXT
}, {
	sequelize, 
	modelName: 'companies'
});

export default Company;