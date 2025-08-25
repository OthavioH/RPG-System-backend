import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Campaign } from "./Campaign";
import { AfterInsert } from "typeorm";
import { Inventory } from "./Inventory";
import { WeaponInventory } from "./WeaponInventory";
import { Ritual } from "./Ritual";
import { Ability } from "./Ability";
import { SheetSkill } from "./SheetSkill";
import { Attribute } from "./Attribute";
import { SheetAttribute } from "./SheetAttribute";
import { AppDataSource } from "../config/data-source";

@Entity({ name: "sheets" })
export class Sheet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  campaignId: string;

  @ManyToOne(() => Campaign, campaign => campaign.sheets)
  @JoinColumn({ name: "campaignId" })
  campaign: Campaign;

  @Column({ default: "" })
  profileImageUrl: string = "";

  @Column({ default: "" })
  name: string = "";

  @Column({ default: 0 })
  age: number = 0;

  @Column({ default: "" })
  gender: string = "";

  @Column({ default: 5 })
  nex: number = 5;

  @Column({ default: "" })
  rank: string = "";

  @Column({ default: "" })
  class: string = "";

  @Column({ default: "" })
  origin: string = "";

  @Column({ default: 0 })
  effortPoints: number;

  @Column({ default: 0 })
  maxEffortPoints: number;

  @Column({ default: null })
  proficiences: string;

  @OneToMany(() => SheetSkill, sheetSkill => sheetSkill.sheet)
  skills: SheetSkill[];

  @OneToMany(() => SheetAttribute, sheetAttribute => sheetAttribute.sheet)
  attributes: SheetAttribute[];

  @ManyToMany(() => Ability)
  @JoinTable({ name: "abilities" })
  abilities: Ability[];

  @ManyToMany(() => Ritual)
  @JoinTable({ name: "rituals" })
  rituals: Ritual[];

  @OneToOne(() => WeaponInventory)
  @JoinColumn({ name: "weaponInventoryId" })
  weaponInventory: WeaponInventory;

  @Column({ nullable: true })
  weaponInventoryId: string;

  @OneToOne(() => Inventory)
  @JoinColumn({ name: "inventoryId" })
  inventory: Inventory;

  @Column({ nullable: true })
  inventoryId: string;

  @Column({ default: 0 })
  hp: number = 0;

  @Column({ default: 0 })
  maxHp: number = 0;

  @Column({ default: 0 })
  sanity: number = 0;

  @Column({ default: 0 })
  maxSanity: number = 0;

  @Column({ default: 0 })
  passiveDefense: number;

  @Column({ default: 0 })
  blockDefense: number = 0;

  @Column({ default: 0 })
  dodgeDefense: number = 0;

  @Column({ default: 0 })
  physicsResistance: number = 0;

  @Column({ default: 0 })
  ballisticResistance: number = 0;

  @Column({ default: 0 })
  energyResistance: number = 0;

  @Column({ default: 0 })
  bloodResistance: number = 0;

  @Column({ default: 0 })
  deathResistance: number = 0;

  @Column({ default: 0 })
  knowledgeResistance: number = 0;

  @Column({ default: 0 })
  insanityResistance: number = 0;

  @Column({ default: "" })
  notes: string;
}
