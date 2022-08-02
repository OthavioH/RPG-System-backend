import { Sequelize } from 'sequelize';

const port: number = process.env.DB_PORT as any || 3306;

export const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, { dialect: 'mysql', host: process.env.DB_HOST, port: port },);

