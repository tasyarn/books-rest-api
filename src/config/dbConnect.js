import { Sequelize } from "sequelize";

const dotenv = require('dotenv');

dotenv.config();

const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbDialect = process.env.DB_DIALECT;

const sequelizeConnection = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: dbDialect
});

export default sequelizeConnection;

