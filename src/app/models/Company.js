import Sequelize from 'sequelize';
import sequelize from '../../database/index.js';

const { Model, DataTypes } = Sequelize;

class Company extends Model {}

Company.init({
	companyName: DataTypes.STRING(255),
	symbol: DataTypes.STRING(255),
	industry: DataTypes.STRING(255),
	website: DataTypes.STRING(255),
	employees: DataTypes.INTEGER(11),
	description: DataTypes.TEXT,
	lastUpdate: { 
		type: DataTypes.DATE,
		default: Sequelize.NOW,
		allowNull: false
	}
}, {
	sequelize, 
	modelName: 'companies'
});

export default Company;