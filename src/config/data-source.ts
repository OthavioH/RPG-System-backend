import "reflect-metadata";
import { DataSource } from "typeorm";
import { GameSettings } from "../entity/GameSettings";
import { Sheet } from "../entity/Sheet";
import { Threat } from "../entity/Threat";
import { User } from "../entity/User";
import { Campaign } from "../entity/Campaign";

require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  synchronize: true,
  logging: false,
  entities: [Sheet, GameSettings, Threat, User, Campaign],
  subscribers: [],
  migrations: [],
});
