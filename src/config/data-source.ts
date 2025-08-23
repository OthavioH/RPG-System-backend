import "reflect-metadata";
import { DataSource } from "typeorm";
import { Sheet } from "../entity/Sheet";
import { Threat } from "../entity/Threat";
import { User } from "../entity/User";
import { Campaign } from "../entity/Campaign";
import { Ability } from "../entity/Ability";
import { Attribute } from "../entity/Attribute";
import { DiceRoll } from "../entity/DiceRoll";
import { Inventory } from "../entity/Inventory";
import { InventoryItem } from "../entity/InventoryItem";
import { Ritual } from "../entity/Ritual";
import { SheetAttribute } from "../entity/SheetAttribute";
import { SheetSkill } from "../entity/SheetSkill";
import { Skill } from "../entity/Skill";
import { Weapon } from "../entity/Weapon";
import { WeaponInventory } from "../entity/WeaponInventory";

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
  entities: [Sheet, Threat, User, Campaign, Ability, Attribute, DiceRoll, Inventory, InventoryItem, Ritual, SheetAttribute, SheetSkill, Skill, Weapon, WeaponInventory],
  subscribers: [],
  migrations: [],
});
