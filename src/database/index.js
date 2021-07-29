import Sequelize from "sequelize";
import database from "../config/database.cjs";
import process from "process";

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(database[env]);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize