import { Sequelize } from "sequelize-typescript";

const dbConnectionString = process.env.DB_CONNECTION_STRING as string;


const sequelize = new Sequelize( dbConnectionString, {
  dialect: "postgres",
});

export default sequelize;