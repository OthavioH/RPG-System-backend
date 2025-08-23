import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { AfterInsert } from "typeorm";
import { Inventory } from "./Inventory";
import { WeaponInventory } from "./WeaponInventory";
import { Ritual } from "./Ritual";
import { Ability } from "./Ability";
import { SheetSkill } from "./SheetSkill";
import { Attribute } from "./Attribute";
import { SheetAttribute } from "./SheetAttribute";

@Entity({ name: "sheets" })
export class Sheet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: "" })
  playerName: string = "";

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
  @JoinTable({ name: "sheet_abilities" })
  abilities: Ability[];

  @ManyToMany(() => Ritual)
  @JoinTable({ name: "sheet_rituals" })
  rituals: Ritual[];

  @OneToOne(() => WeaponInventory)
  @JoinColumn({ name: "weaponInventoryId" })
  weaponInventory: WeaponInventory;

  @Column()
  weaponInventoryId: string;

  @OneToOne(() => Inventory)
  @JoinColumn({ name: "inventoryId" })
  inventory: Inventory;

  @Column()
  inventoryId: string;

  @Column({ default: 0 })
  hp: number = 0;

  @Column({ default: 0 })
  maxHp: number = 0;

  @AfterInsert()
  async createDefaultAttributes() {
    const attrRepo = (this as any).constructor.getRepository(Attribute);
    const sheetAttrRepo = (this as any).constructor.getRepository(SheetAttribute);
    const attributes = await attrRepo.find();
    for (const attr of attributes) {
      const exists = await sheetAttrRepo.findOneBy({ sheetId: this.id, attributeId: attr.id });
      if (!exists) {
        const sheetAttr = sheetAttrRepo.create({
          sheetId: this.id,
          attributeId: attr.id,
          value: 0
        });
        await sheetAttrRepo.save(sheetAttr);
      }
    }
  }
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

  @Column({ default: null })
  notes: string;
}
