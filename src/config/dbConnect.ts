import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const dbUser = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbName = process.env.DB_NAME as string;
const dbHost = process.env.DB_HOST as string;
const dbDialect = "postgres";

const sequelizeConnect = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect
});

export default sequelizeConnect;