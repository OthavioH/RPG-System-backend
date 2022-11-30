"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const GameSettings_1 = require("../entity/GameSettings");
const Sheet_1 = require("../entity/Sheet");
const Threat_1 = require("../entity/Threat");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    synchronize: true,
    logging: false,
    entities: [Sheet_1.Sheet, GameSettings_1.GameSettings, Threat_1.Threat],
    subscribers: [],
    migrations: [],
});
