import Sequelize from "sequelize"; //Sequelize is a modern TypeScript and Node.js ORM for Postgres, MySQL, MariaDB, SQLite and SQL Server, and more.
// import dotenv from "dotenv"; //Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
import "dotenv/config";
// dotenv.config();

export const connection = new Sequelize(
  // process.env.DB_BASE, // DataBase
  // process.env.DB_USER, // User
  // process.env.DB_PASS, // Password
  process.env.DB_URL,
  // {
  //   host: process.env.DB_LOCAL, //URL do meu dados
  //   port: 5432, //Porta que está o banco de dados
  //   dialect: "postgres", //Qual banco de dados o Sequelize está trabalhando
  // },
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);
