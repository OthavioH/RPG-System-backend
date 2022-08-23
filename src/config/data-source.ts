import "reflect-metadata";
import { DataSource } from "typeorm";
import { GameSettings } from "../entity/GameSettings";
import { Sheet } from "../entity/Sheet";
import { Threat } from "../entity/Threat";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Sheet, GameSettings, Threat],
  subscribers: [],
  migrations: [],
});
