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
import { SheetRitual } from "./SheetRitual";
import { SheetDefense } from "./SheetDefense";
import { SheetResistances } from "./SheetResistances";

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

  @OneToMany(() => SheetRitual, sheetRitual => sheetRitual.sheet)
  @JoinTable({ name: "rituals" })
  rituals: SheetRitual[];

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

  @OneToOne(() => SheetDefense, defense => defense.sheet, { cascade: true })
  @JoinColumn()
  defense: SheetDefense;

  @OneToOne(() => SheetResistances, resistances => resistances.sheet, { cascade: true })
  @JoinColumn()
  resistances: SheetResistances;

  @Column({ default: "" })
  notes: string;

  @AfterInsert()
  async createDefaultRelations() {
    const sheetDefenseRepo = AppDataSource.getRepository(SheetDefense);
    const sheetResistancesRepo = AppDataSource.getRepository(SheetResistances);
    
    const defense = sheetDefenseRepo.create({
      sheet: { id: this.id },
    });

    await sheetDefenseRepo.save(defense);

    const resistances = sheetResistancesRepo.create({
      sheet: { id: this.id },
    });

    await sheetResistancesRepo.save(resistances);
  }
}
